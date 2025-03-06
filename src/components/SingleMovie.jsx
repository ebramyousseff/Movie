import React from 'react'
import { Link } from "react-router-dom";


const CategoryCard = ({ category, isActive, onClick }) => {
  return (
    <div> <h3
    className={`text-lg cursor-pointer transition-colors duration-300 ${
      isActive === category.endpoint
        ? "text-[#dcf836]"
        : "text-white hover:text-[#dcf836]"
    }`}
    onClick={() => onClick(category.endpoint)}
  >
    {category.name}
  </h3></div>
  )
}

export default CategoryCard