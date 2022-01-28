import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
import { render, screen } from '@testing-library/react';
import express from 'express';

const testArticle = {
    createdOn: 'today',
    image: 'https://images.unsplash.com/photo-1554752793-d1cf0a08ede1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    headline: 'Mountains are Dope!',
    author: 'JCSime',
    summary: 's-s-s-summary time!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In fermentum posuere urna nec tincidunt praesent semper. Adipiscing elit duis tristique sollicitudin. Non diam phasellus vestibulum lorem sed. Posuere lorem ipsum dolor sit amet consectetur adipiscing. Ullamcorper morbi tincidunt ornare massa eget.'
}
const testArticleNoAuth = {
    createdOn: 'today',
    image: 'https://images.unsplash.com/photo-1554752793-d1cf0a08ede1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    headline: 'Mountains are Dope!',
    author: null,
    summary: 's-s-s-summary time!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In fermentum posuere urna nec tincidunt praesent semper. Adipiscing elit duis tristique sollicitudin. Non diam phasellus vestibulum lorem sed. Posuere lorem ipsum dolor sit amet consectetur adipiscing. Ullamcorper morbi tincidunt ornare massa eget.'
}

test('renders component without errors', ()=> {
    render(<Article article={testArticle}/>);
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testArticle}/>);

    const headline = screen.queryByTestId('headline');
    const author = screen.queryByTestId('author');
    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testArticleNoAuth}/>);

    const press = screen.queryByText(/associated press/i);
    expect(press).toBeInTheDocument();
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn();
    render(<Article article={testArticle} handleDelete={handleDelete}/>);

    const deleteBtn = screen.queryByTestId('deleteButton');
    userEvent.click(deleteBtn);
    expect(handleDelete).toBeCalled();
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.