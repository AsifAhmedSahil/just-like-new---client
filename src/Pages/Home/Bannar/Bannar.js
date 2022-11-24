import React from 'react'
// import hero from "../../../assets/hero.jpg"

const Bannar = () => {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1921&q=80")` }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md text-white">
      <h1 className="mb-5 text-7xl font-bold">Hello there</h1>
      <p className="mb-5 text-xl">Resellers find and market products made by other companies and sell them to customers. You have to do extensive research to find the right partner, identify your target audience, and create a marketing strategy.</p>
      <button className="btn btn-primary ">Get Started</button>
    </div>
  </div>
</div>
  )
}

export default Bannar