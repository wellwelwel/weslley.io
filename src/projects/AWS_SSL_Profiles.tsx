import { Project } from '../components/Project';

export const AWS_SSL_Profiles = () => (
  <Project
    name='AWS SSL Profiles'
    organization='mysqljs'
    repository='aws-ssl-profiles'
    npm='aws-ssl-profiles'
    license='MIT'
  >
    <p>
      📜 Originado de uma confusão após a <strong>AWS</strong> mudar todos seus
      certificados de autenticação dos serviços <strong>RDS</strong>, quebrando
      sistemas que funcionavam perfeitamente há anos, esse projeto veio para
      unificar os certificados em um único lugar.
    </p>
    <p>
      Dessa forma, qualquer mantenedor de um projeto que dependa desses
      certificados (<code>mysql</code>, <code>mysql2</code> e <code>pg</code>,
      em especial), não precisa mais se preocupar com atualizações inesperadas.
    </p>
    <p>
      Apesar de sua simplicidade, ele é baixado{' '}
      <strong>mais de 5 milhões</strong> de vezes por mês.
    </p>
  </Project>
);
