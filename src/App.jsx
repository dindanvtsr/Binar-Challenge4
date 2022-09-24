import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Input from './Input';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/input" element={<Input />} />
      <Route path="/input/:id" element={<Input />} />
    </Routes>
  );
}