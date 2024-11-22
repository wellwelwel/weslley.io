import React from 'react';
import Card from './components/Card.js';
import { Star } from 'lucide-react';

export const App = () => (
  <html lang='pt-BR'>
    <head>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta charSet='UTF-8' />
      <link rel='stylesheet' href='/styles/reset.css' />
      <link rel='stylesheet' href='/styles/main.css' />
      <title>Weslley Araújo: Links</title>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=family=Poppins:wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap'
        rel='stylesheet'
      />
    </head>
    <body>
      <main>
        <header>
          <img loading='lazy' src='/images/me.png' alt='Avatar' />
          <h1>Weslley Araújo</h1>
          <small>
            Open Sourcerer | End-to-End Developer
            <br />
            MySQL2 Co-Maintainer |{' '}
            <a
              href='https://poku.io/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Poku
            </a>
            's Creator
          </small>
        </header>
        <nav>
          <Card
            name='LinkedIn'
            icon='linkedin'
            description='Dicas de programação e conteúdos técnicos.'
            href='https://www.linkedin.com/in/wellwelwel/'
          />
          <Card
            name='Instagram'
            icon='instagram'
            description='Conteúdos casuais, um gato aqui e um show ali.'
            href='https://www.instagram.com/wellwelwel/'
          />
          <Card
            name='GitHub'
            icon='github'
            description='Aqui você encontra projetos realmente interessantes.'
            href='https://github.com/wellwelwel'
          />
        </nav>
        <nav>
          <h2>
            <img src="/images/star.svg" alt="Ícone de Estrela" />
            Principais Projetos
          </h2>
          <Card
            name='Poku'
            icon='junior'
            description='Que tal deixar uma estrela pro nosso porquinho test runner brasileiro? 🇧🇷'
            href='https://github.com/wellwelwel/poku'
          />
          <Card
            name='lru.min'
            icon='lru'
            description='Um dos caches baseados em LRU mais performáticos de todo o eco-sistema JavaScript.'
            href='https://www.npmjs.com/package/lru.min'
          />
          <Card
            name='⚡️ MySQL2'
            icon='mysql2'
            description='Driver MySQL de alta performance mais baixado do eco-sistema JavaScript.'
            href='https://github.com/sidorares/node-mysql2'
          />
        </nav>
        <small>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <img src='/images/hands.svg' alt='Cumprimento de mãos' />
            <span>Veja como esse site foi criado</span>
          </a>
        </small>
      </main>
    </body>
  </html>
);
