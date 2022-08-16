import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Login from '../components/Login';

export default function Home({ posts }) {
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const res = await fetch(`http://localhost:3000/api/auth/login`, {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       "email": "test@email.com",
  //       "password": "testtesttesttestes"
  //     })
  //   }).then(res => res.json());

  //   console.log(res)
  // };

  return (
    <Login />
  );
}

export const getServerSideProps = async ctx => {
  console.log(ctx.req.headers.cookie);
  const posts = await fetch(`http://localhost:3000/api/posts`, {
    credentials: 'include',
    headers: {
      Cookie: ctx.req.headers?.cookie,
    },
  }).then(res => res.status);

  console.log(posts);

  return {
    props: {

    },
  };
};