import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Target from '../assets/Page-1.png';
import Nutrition from '../assets/Group.png';
import Clipboard from '../assets/Group (1).png';
import FridgeIcon from '../assets/Group 8.png';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the title based on the current route
  const getTitle = () => {
    switch (location.pathname) {
      case '/a/goals':
        return 'Goals & Stats';
      case '/a/tracker':
        return 'Nutrition Tracker';
      case '/a/fridge':
        return 'My Fridge';
      case '/a/meal-planner':
        return 'Meal Planner';
      default:
        return 'Fridge';
    }
  };

  return (
    <div className="relative w-96 h-screen flex justify-center items-center font-mali">
      {/* Outer semi-opaque border */}
      <div className="w-80 h-[90%] bg-white bg-opacity-20 rounded-[2rem] shadow-lg p-6 border border-1">
        {/* Inner main white section */}
        <div className="w-full h-full bg-white rounded-3xl p-4 flex flex-col">
          {/* Title */}
          <h1 className="text-center text-2xl font-semibold mb-8">{getTitle()}</h1>

          {/* Service Options */}
          <div className="flex flex-col space-y-4 flex-grow">
            <button
              onClick={() => navigate('/a/goals')}
              className={`flex items-center space-x-2 p-2 rounded-md ${
                location.pathname === '/a/goals' ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-300'
              } border-2 border-transparent hover:border-transparent`}
            >
              <img src={Target} alt="Goals & Stats" className="w-6 h-6 object-contain" />
              <span>Goals & Stats</span>
            </button>
            <button
              onClick={() => navigate('/a/tracker')}
              className={`flex items-center space-x-2 p-2 rounded-md ${
                location.pathname === '/a/tracker' ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-300'
              } border-2 border-transparent hover:border-transparent`}
            >
              <img src={Nutrition} alt="Nutrition Tracker" className="w-6 h-6 object-contain" />
              <span>Nutrition Tracker</span>
            </button>
            <button
              onClick={() => navigate('/a/meal-planner')}
              className={`flex items-center space-x-2 p-2 rounded-md ${
                location.pathname === '/a/meal-planner' ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-300'
              } border-2 border-transparent hover:border-transparent`}
            >
              <img src={Clipboard} alt="Meal Planner" className="w-6 h-6 object-contain" />
              <span>Meal Planner</span>
            </button>
          </div>

          {/* Fridge Option */}
          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={() => navigate('/a/fridge')}
              className={`flex w-full items-center space-x-2 p-2 rounded-md ${
                location.pathname === '/a/fridge' ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-300'
              } border-2 border-transparent hover:border-transparent`}
            >
              <img src={FridgeIcon} alt="My Fridge" className="w-6" />
              <span>My Fridge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
