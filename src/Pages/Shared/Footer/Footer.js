import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content my-9">
  <div>
    <span className="footer-title">Services</span> 
    <Link to="/" className="link link-hover">Laptop</Link> 
    <Link to="/" className="link link-hover">Asus</Link> 
    <Link to="/" className="link link-hover">Dell</Link> 
    <Link to="/" className="link link-hover">Hp</Link>
  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <Link to="/" className="link link-hover">About us</Link> 
    <Link to="/" className="link link-hover">Contact</Link> 
    <Link to="/" className="link link-hover">Jobs</Link> 
    <Link to="/" className="link link-hover">Report</Link>
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <Link to="/" className="link link-hover">Terms of use</Link> 
    <Link to="/" className="link link-hover">Privacy policy</Link> 
    <Link to="/" className="link link-hover">Cookie policy</Link>
  </div> 
  <div>
    <span className="footer-title">Newsletter</span> 
    <div className="form-control w-80">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label> 
      <div className="relative">
        <input type="text" placeholder="justlikenew@gmail.com" className="input input-bordered w-full pr-16" /> 
        <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer