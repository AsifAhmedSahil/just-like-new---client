import React from "react";

const Blogs = () => {
  return (
    <div className="max-w-[1240px] mx-auto">
      {/* question 1 */}
      <div className="card w-96 lg:w-full  shadow-xl mt-6 ">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            What are the different ways to manage a state in a React
            application?
          </h2>
          <p>
            A common problem developers are faced when working on a React
            application is figuring out the best way to manage state between all
            their components. You simply pass the state via props. Of course
            things can get pretty complicated as you add more and more
            components that rely on the same shared state. For most use cases,
            this will probably be the best solution{" "}
          </p>
        </div>
      </div>

      {/* question 2*/}
      <div className="card w-96 lg:w-full shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            How does prototypical inheritance work?
          </h2>
          <p>
            JavaScript doesn’t use classical inheritance instead it uses the
            phenomenon called Prototype Inheritance. In Prototype Inheritance,
            an object uses the properties or methods of another object via the
            prototype linkage. All the JavaScript objects inherit properties and
            methods from a prototype (like Date objects inherit properties from
            Date.prototype and so on).
          </p>
        </div>
      </div>

      {/* question 1 */}
      <div className="card w-96 lg:w-full shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            What is a unit test? Why should we write unit tests?
          </h2>
          <p>
            Unit testing is mostly done by the software developers or white box
            testers. It is the process of segregating each part of the program
            (unit) and checking whether they are fit for use or not. In other
            words, it is the practice of writing code to test your code and then
            run those tests in an automated fashion. A lot of organizations test
            the functions or code manually. A developer runs the application, he
            may log in on some pages and after few clicks here and there he is
            redirected to the page where this function is used.
          </p>
        </div>
      </div>

      {/* question 1 */}
      <div className="card w-96 lg:w-full shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title text-2xl">React vs. Angular vs. Vue?</h2>
          <p>
            React is a UI library, Angular is a fully-fledged front-end
            framework, while Vue.js is a progressive framework. They can be used
            almost interchangeably to build front-end applications, but they’re
            not 100 percent the same, so it makes sense to compare them and
            understand their differences. Each framework is component-based and
            allows the rapid creation of UI features. However, they all have a
            different structure and architecture
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
