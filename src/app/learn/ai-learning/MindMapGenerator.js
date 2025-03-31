import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MindMapGenerator({ aiSummary, setActiveSection }) {
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
    
    // Use pre-generated mind map data if available
    if (aiSummary.mindMapData && 
        aiSummary.mindMapData.nodes && 
        aiSummary.mindMapData.links) {
      return aiSummary.mindMapData;
    }
    
    // Otherwise generate from concepts
    const nodes = [
      { id: 'root', label: aiSummary.title || 'Main Topic', x: 400, y: 150, level: 0 }
    ];
    
    const links = [];
    
    // Add main concept nodes
    let nodeId = 1;
    const concepts = aiSummary.concepts || {};
    
    Object.keys(concepts).forEach((concept, index) => {
      const angle = (Math.PI * 2 / Object.keys(concepts).length) * index - Math.PI / 2;
      const radius = 150;
      const x = 400 + Math.cos(angle) * radius;
      const y = 150 + Math.sin(angle) * radius;
      
      const id = `node-${nodeId}`;
      nodes.push({ id, label: concept, x, y, level: 1, parentId: 'root' });
      links.push({ source: 'root', target: id, value: 1 });
      
      // Add subconcept nodes
      if (Array.isArray(concepts[concept])) {
        concepts[concept].forEach((subconcept, subIndex) => {
          nodeId++;
          const subAngle = angle - Math.PI/8 + (Math.PI/4 / concepts[concept].length) * subIndex;
          const subRadius = 100;
          const subX = x + Math.cos(subAngle) * subRadius;
          const subY = y + Math.sin(subAngle) * subRadius;
          
          const subId = `node-${nodeId}`;
          nodes.push({ id: subId, label: subconcept, x: subX, y: subY, level: 2, parentId: id });
          links.push({ source: id, target: subId, value: 1 });
        });
      }
      
      nodeId++;
    });
    
    return { nodes, links };
  };
  
  const { nodes, links } = generateMindMap();
  
  // Display a message if no content has been uploaded yet
  if (!aiSummary) {
    return (
      <motion.section
        className="min-h-screen py-12 flex flex-col items-center justify-center"
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
        
        <motion.div
          className="max-w-md mx-auto text-center p-8 bg-blue-900/20 rounded-xl border border-blue-800/30"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-blue-200 mb-4">Please upload a document first to generate a mind map.</p>
          <motion.button
            className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.9)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection('upload')}
          >
            Go to Upload
          </motion.button>
        </motion.div>
      </motion.section>
    );
  }
  
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

      <div className="container mx-auto px-4">
        <div className="relative w-full h-[600px] bg-blue-900/20 rounded-xl border border-blue-800/30 overflow-hidden">
          {/* SVG Mind Map Rendering */}
          <svg width="100%" height="100%" viewBox="0 0 800 600">
            {/* Render Links */}
            {links.map((link, index) => {
              const source = nodes.find(n => n.id === link.source);
              const target = nodes.find(n => n.id === link.target);
              
              if (!source || !target) return null;
              
              const isExpanded = expandedNodes[source.id] !== false;
              
              // Skip drawing connections to children of collapsed nodes
              if (target.level > 1 && target.parentId && !expandedNodes[target.parentId]) {
                return null;
              }
              
              return (
                <motion.line
                  key={`link-${index}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={hoveredNode === source.id || hoveredNode === target.id ? "#60A5FA" : "#1E40AF"}
                  strokeWidth={hoveredNode === source.id || hoveredNode === target.id ? 2 : 1}
                  strokeOpacity={0.6}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
            
            {/* Render Nodes */}
            {nodes.map((node) => {
              // Skip rendering child nodes of collapsed parents
              if (node.level > 1 && node.parentId && !expandedNodes[node.parentId]) {
                return null;
              }
              
              const isExpanded = expandedNodes[node.id] !== false;
              const nodeSize = node.level === 0 ? 60 : node.level === 1 ? 40 : 30;
              
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x - nodeSize/2}, ${node.y - nodeSize/2})`}
                  onClick={() => toggleNode(node.id)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <motion.circle
                    cx={nodeSize/2}
                    cy={nodeSize/2}
                    r={nodeSize/2}
                    fill={node.id === 'root' ? "#3B82F6" : node.level === 1 ? "#1D4ED8" : "#2563EB"}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      fill: hoveredNode === node.id ? 
                        (node.id === 'root' ? "#60A5FA" : node.level === 1 ? "#3B82F6" : "#60A5FA") : 
                        (node.id === 'root' ? "#3B82F6" : node.level === 1 ? "#1D4ED8" : "#2563EB")
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.text
                    x={nodeSize/2}
                    y={nodeSize/2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#FFFFFF"
                    fontSize={node.level === 0 ? 14 : node.level === 1 ? 12 : 10}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      pointerEvents: 'none',
                      fontWeight: node.level === 0 ? 'bold' : 'normal'
                    }}
                  >
                    {node.label.length > 15 ? node.label.substring(0, 15) + '...' : node.label}
                  </motion.text>
                  
                  {/* Expand/Collapse indicator for parent nodes */}
                  {nodes.some(n => n.parentId === node.id) && (
                    <motion.circle
                      cx={nodeSize}
                      cy={0}
                      r={8}
                      fill="#2563EB"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    />
                  )}
                  
                  {nodes.some(n => n.parentId === node.id) && (
                    <motion.text
                      x={nodeSize}
                      y={0}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#FFFFFF"
                      fontSize={8}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{ pointerEvents: 'none' }}
                    >
                      {isExpanded ? '-' : '+'}
                    </motion.text>
                  )}
                </g>
              );
            })}
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-blue-900/50 p-3 rounded-lg">
            <div className="text-sm text-blue-200 mb-2">Legend</div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-xs text-blue-300">Main Topic</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-blue-700 mr-2"></div>
              <span className="text-xs text-blue-300">Key Concept</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
              <span className="text-xs text-blue-300">Sub-Concept</span>
            </div>
          </div>
        </div>
        
        {/* Node Details Panel */}
        {hoveredNode && (
          <motion.div
            className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-800/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 className="text-xl text-blue-200 mb-2">
              {nodes.find(n => n.id === hoveredNode)?.label}
            </h3>
            <p className="text-blue-300 text-sm">
              {nodes.find(n => n.id === hoveredNode)?.level === 0 
                ? "Main topic of the document." 
                : nodes.find(n => n.id === hoveredNode)?.level === 1
                  ? "Key concept related to the main topic."
                  : "Subconcept providing additional detail."}
            </p>
          </motion.div>
        )}
        
        {/* Navigation Controls */}
        <div className="mt-8 flex justify-between">
          <motion.button
            className="px-6 py-2 bg-blue-900/50 text-blue-200 rounded-full text-sm font-medium border border-blue-800/50"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 58, 138, 0.7)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection('summary')}
          >
            Back to Summary
          </motion.button>
          
          <motion.button
            className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.9)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection('flashcards')}
          >
            View Flashcards
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}