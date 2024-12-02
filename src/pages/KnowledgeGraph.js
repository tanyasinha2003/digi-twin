import React from 'react'
import Navbar from "../components/navbar";
import Graph from '../components/graph';


import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import ChatWindow from '../components/chat-window';

function Model(props) {
  const { scene } = useGLTF("/cartoon_car.glb");
  return <primitive object={scene} {...props} />;
}

export default function KnowledgeGraph() {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#222831] overflow-hidden">
    <Navbar />
   
    <ChatWindow />
   <Graph />
   
  </div>
  )
}
