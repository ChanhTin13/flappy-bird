// pages/index.js 
import dynamic from 'next/dynamic';

const PhaserGame = dynamic(() => import('../components/PhaserGame'), { ssr: false });
const Home = () => {
  return (
    <div >
      <PhaserGame />
    </div>
  );
};

export default Home;
