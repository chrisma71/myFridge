import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from './components/sidebar';
import axios from 'axios';

const Goals: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [goals, setGoals] = useState('');
  const [calorieGoal, setCalorieGoal] = useState<number | ''>('');
  const [proteinGoal, setProteinGoal] = useState<number | ''>('');
  const [preferences, setPreferences] = useState('');

  const [namePlaceholder, setNamePlaceholder] = useState('');
  const [agePlaceholder, setAgePlaceholder] = useState<number | ''>('');
  const [weightPlaceholder, setWeightPlaceholder] = useState<number | ''>('');
  const [goalsPlaceholder, setGoalsPlaceholder] = useState('');
  const [calorieGoalPlaceholder, setCalorieGoalPlaceholder] = useState<number | ''>('');
  const [proteinGoalPlaceholder, setProteinGoalPlaceholder] = useState<number | ''>('');
  const [preferencesPlaceholder, setPreferencesPlaceholder] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = getCookie('userId');
        if (userId) {
          const response = await axios.get(`https://myfridge-0q77.onrender.com/api/users/${userId}`);
          const userData = response.data;

          // Set the placeholders with the current user data
          setNamePlaceholder(userData.name || '');
          setAgePlaceholder(userData.age || '');
          setWeightPlaceholder(userData.weight || '');
          setGoalsPlaceholder(userData.goals || '');
          setCalorieGoalPlaceholder(userData.calorieGoal || '');
          setProteinGoalPlaceholder(userData.proteinGoal || '');
          setPreferencesPlaceholder(userData.preferences || '');
        } else {
          console.error('User ID not found in cookies.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<number | ''>>, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]+$/.test(value)) {
      setter(value === '' ? '' : parseInt(value, 10));
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = getCookie('userId');
      if (userId) {
        await axios.post(`https://myfridge-0q77.onrender.com/api/users/${userId}/goals`, {
          name: name || namePlaceholder,
          age: age || agePlaceholder,
          weight: weight || weightPlaceholder,
          goals: goals || goalsPlaceholder,
          calorieGoal: calorieGoal || calorieGoalPlaceholder,
          proteinGoal: proteinGoal || proteinGoalPlaceholder,
          preferences: preferences || preferencesPlaceholder,
        });
        alert('Goals updated successfully!');
        window.location.href = '/a/tracker';
      } else {
        alert('User ID not found in cookies.');
      }
    } catch (error) {
      console.error('Error saving goals:', error);
      alert('Failed to update goals.');
    }
  };

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return '';
  };

  return (
    <div className="flex bg-gradient-to-tr from-[#F5776F] to-[#C1E1C1] min-h-screen w-screen font-mali">
      <Helmet>
        <title>myFridge • Goals & Stats</title>
      </Helmet>

      <Sidebar />
      <div className="flex-1 p-8 flex justify-center items-center">
        <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">What’s your name?</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] focus:outline-none focus:border-blue-400"
                placeholder={namePlaceholder || "Enter your name"}
              />
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Age</label>
              <input
                type="text"
                value={age}
                onChange={(e) => handleChange(setAge, e)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
                placeholder={agePlaceholder ? agePlaceholder.toString() : "Enter your age"}
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Weight (lbs)</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => handleChange(setWeight, e)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
                placeholder={weightPlaceholder ? weightPlaceholder.toString() : "Enter your weight"}
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Goals</label>
              <input
                type="text"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
                placeholder={goalsPlaceholder || "Enter your goals"}
              />
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Daily Calorie Goal</label>
              <input
                type="text"
                value={calorieGoal}
                onChange={(e) => handleChange(setCalorieGoal, e)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
                placeholder={calorieGoalPlaceholder ? calorieGoalPlaceholder.toString() : "Enter your daily calorie goal"}
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Daily Protein Goal</label>
              <input
                type="text"
                value={proteinGoal}
                onChange={(e) => handleChange(setProteinGoal, e)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
                placeholder={proteinGoalPlaceholder ? proteinGoalPlaceholder.toString() : "Enter your daily protein goal"}
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold mb-2">Preferences</label>
              <input
                type="text"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#D9D9D9] border-2 focus:outline-none focus:border-blue-400"
                placeholder={preferencesPlaceholder || "Enter your dietary preferences"}
              />
            </div>
          </div>
          <div className="col-span-3 flex justify-center mt-4">
            <button
              onClick={handleSubmit}
              className="w-1/4 p-4 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
