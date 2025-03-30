import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MindMapGenerator({ aiSummary }) {
  const [expandedNodes, setExpandedNodes] = useState({});
  const [hoveredNode, setHoveredNode] = useState(null);
  
  const toggleNode = (id) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Create mindmap from AI summary
  const generateMindMap = () => {
    if (!aiSummary) return { nodes: [], links: [] };
    
    const nodes = [
      { id: 'root', label: 'Machine Learning', x: 400, y: 150, level: 0 }
    ];
    
    const links = [];
    
    // Add main concept nodes
    let nodeId = 1;
    Object.keys(aiSummary.concepts).forEach((concept, index) => {
      const angle = (Math.PI * 2 / Object.keys(aiSummary.concepts).length) * index - Math.PI / 2;
      const radius = 150;
      const x = 400 + Math.cos(angle) * radius;
      const y = 150 + Math.sin(angle) * radius;
      
      const id = `node-${nodeId}`;
      nodes.push({ id, label: concept, x, y, level: 1, parentId: 'root' });
      links.push({ source: 'root', target: id, value: 1 });
      
      // Add subconcept nodes
      aiSummary.concepts[concept].forEach((subconcept, subIndex) => {
        nodeId++;
        const subAngle = angle - Math.PI/8 + (Math.PI/4 / aiSummary.concepts[concept].length) * subIndex;
        const subRadius = 100;
        const subX = x + Math.cos(subAngle) * subRadius;
        const subY = y + Math.sin(subAngle) * subRadius;
        
        const subId = `node-${nodeId}`;
        nodes.push({ id: subId, label: subconcept, x: subX, y: subY, level: 2, parentId: id });
        links.push({ source: id, target: subId, value: 1 });
      });
      
      nodeId++;
    });
    
    return { nodes, links };
  };
  
  const { nodes, links } = generateMindMap();
  
  // Calculate positions based on expanded state
  const calculatePositions = () => {
    // This would contain more complex logic for dynamic node positioning
    // based on which nodes are expanded
    return nodes;
  };
  
  const displayNodes = calculatePositions();
  
  return (
    <motion.section
      className="min-h-screen py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        AI-Generated Mind Map
      </motion.h2>
      
      <p className="text-blue-200 mb-12 text-center max-w-2xl mx-auto">
        Visualize connections between concepts with this interactive mind map. Click on nodes to expand subtopics.
      </p>
      
      {/* Mind Map Canvas */}
      <div className="relative w-full h-96 md:h-[32rem] max-w-4xl mx-auto bg-blue-900/30 rounded-xl overflow-hidden border border-blue-800/50 mb-8">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/0 to-indigo-900/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        
        {/* Links */}
        <svg className="absolute inset-0 w-full h-full">
          {links.map((link, index) => {
            const source = nodes.find(n => n.id === link.source);
            const target = nodes.find(n => n.id === link.target);
            
            // Only show links to visible nodes
            if (target.level === 2 && !expandedNodes[target.parentId]) return null;
            
            return (
              <motion.line
                key={`${link.source}-${link.target}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={hoveredNode === source.id || hoveredNode === target.id ? "#60A5FA" : "#2563EB"}
                strokeWidth={hoveredNode === source.id || hoveredNode === target.id ? 2 : 1}
                strokeOpacity={0.6}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + (index * 0.05),
                  type: "spring"
                }}
              />
            );
          })}
        </svg>
        
        {/* Nodes */}
        {nodes.map((node) => {
          // Hide level 2 nodes if parent not expanded
          if (node.level === 2 && !expandedNodes[node.parentId]) return null;
          
          return (
            <motion.div
              key={node.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                node.level === 0 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2' 
                  : node.level === 1 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 px-3 py-1.5' 
                    : 'bg-gradient-to-r from-blue-700 to-indigo-800 px-2 py-1'
              } rounded-lg shadow-lg ${hoveredNode === node.id ? 'shadow-blue-400/30' : ''}`}
              style={{ left: node.x, top: node.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                boxShadow: hoveredNode === node.id 
                  ? '0 0 15px 5px rgba(59, 130, 246, 0.3)' 
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + (node.level * 0.2),
                type: "spring"
              }}
              onClick={() => toggleNode(node.id)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className="text-white text-sm font-medium whitespace-nowrap">
                {node.label}
                {node.level < 2 && (
                  <span className="ml-1 text-xs">
                    {expandedNodes[node.id] ? '−' : '+'}
                  </span>
                )}
              </div>
              <motion.div
                className="absolute -inset-1 bg-blue-400 rounded-lg blur opacity-0 pointer-events-none"
                animate={{ 
                  opacity: hoveredNode === node.id ? 0.2 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          );
        })}
      </div>
      
      <motion.p 
        className="text-blue-300 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Pro Tip: Click on concepts to expand or collapse related subtopics
      </motion.p>
    </motion.section>
  );
}