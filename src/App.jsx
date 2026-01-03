
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [matrix, setMatrix] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [won, setWon] = useState(null);

  const handleUserClick = (e) => {
    const pos = e.target.id;
    if (matrix[pos] || won) return; // ignore click if filled or game won
    const copyMatrix = [...matrix];
    copyMatrix[pos] = isXTurn ? 'X' : 'O';
    setMatrix(copyMatrix);
    setIsXTurn(prev => !prev);
  };

  const decideWinner = () => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (matrix[a] && matrix[a] === matrix[b] && matrix[a] === matrix[c]) {
        setWon(matrix[a]);
      }
    }
  };

  useEffect(() => {
    decideWinner();
  }, [matrix]);

  const resetGame = () => {
    setMatrix(Array(9).fill(null));
    setWon(null);
    setIsXTurn(true);
  };

  return (
    <div className='App h-[500px] mt-10 flex flex-col justify-center items-center'>
      <h1 className='font-bold text-[36px] mb-4'>Tic Tac Toe</h1>

      <div
        className={`board bg-gray-300 grid grid-cols-3 gap-2 border-1 p-2 transition-all duration-300 ${
          won ? "shadow-[0_0_25px_#22c55e]" : ""
        }`}
        onClick={handleUserClick}
      >
        {matrix.map((item, index) => (
          <motion.div
            key={index}
            id={index}
            whileTap={{ scale: 0.9 }}
            className='box w-[100px] h-[100px] border-2 border-black hover:bg-white flex justify-center items-center text-3xl font-bold cursor-pointer'
          >
            <AnimatePresence>
              {item && (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="game-info flex justify-center items-center flex-col mt-8">
        <button
          onClick={resetGame}
          className='border-1 rounded-[5px] p-2 bg-gray-300 w-[120px] mb-3 cursor-pointer'
        >
          Reset
        </button>

        {!won && <div className='text-lg'>Next Player: {isXTurn ? 'X' : 'O'}</div>}

        <AnimatePresence>
          {won && (
            <motion.div
              key="winner"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 text-green-600 font-bold text-xl"
            >
              🎉 Player {won} Won the Game!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
