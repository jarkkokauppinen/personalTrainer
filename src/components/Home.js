import image from './handweight.png';

function Home() {

  return (
    <div className='FrontPage'>
      <p>welcome to</p>
      <h1>PersonalTrainer</h1>
      <img src={image} className='FrontPageImage' alt='handweight'/>
    </div>
  );
}

export default Home;
