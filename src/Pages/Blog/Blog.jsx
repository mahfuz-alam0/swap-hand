import React from 'react';
import useTitle from '../../hooks/useTitle';

const Blog = () => {
    useTitle('Blog')
    return (
        <div className='pt-4 pb-10 max-w-screen-xl mx-auto'>
            <div className='question mt-4'>
                <h3 className='text-xl md:text-3xl font-semibold'>What are the different ways to manage a state in a React application?</h3>
                <p>
                    With React, you won't modify the UI from code directly. For example, you won't write commands like “disable the button”, “enable the button”, “show the success message”, etc. Instead, you will describe the UI you want to see for the different visual states of your component (“initial state”, “typing state”, “success state”), and then trigger the state changes in response to user input. This is similar to how designers think about UI.
                </p>
            </div>
            <div className='question mt-4'>
                <h3 className='text-xl md:text-3xl font-semibold'>How does prototypical inheritance work?</h3>
                <p>
                    The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
                </p>
            </div>
            <div className='question mt-4'>
                <h3 className='text-xl md:text-3xl font-semibold'>What is a unit test? Why should we write unit tests?</h3>
                <p>
                    Unit Testing is a type of software testing where individual units or components of a software are tested. The purpose is to validate that each unit of the software code performs as expected. Unit Testing is done during the development (coding phase) of an application by the developers
                </p>
                <br />
                <p>
                    They enable you to catch bugs early in the development process. Automated unit tests help a great deal with regression testing. They detect code smells in your codebase. For example, if you're having a hard time writing unit tests for a piece of code, it might be a sign that your function is too complex
                </p>
            </div>
            <div className='question mt-4'>
                <h3 className='text-xl md:text-3xl font-semibold'>React vs. Angular vs. Vue?</h3>
                <p>
                    This post is a comprehensive guide on which is perhaps the right solution for you: Angular vs React vs Vue.

                    Just a couple of years ago, developers were mainly debating whether they should be using Angular vs React for their projects. But over the course of the last couple of years, we've seen a growth of interest in a third player called Vue.js.

                    If you are a developer starting out on a project and cannot decide on which JavaScript framework to use, this guide should help you make a decision.
                </p>
            </div>
        </div>
    );
};

export default Blog;