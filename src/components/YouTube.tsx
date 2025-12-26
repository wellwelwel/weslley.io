export const YouTube = ({ path }: { path: string }) => (
  <iframe
    width='100%'
    height='450'
    src={`https://www.youtube.com/embed/${path}`}
    title='Dev Referências - Palestra'
    frameBorder='0'
    allowFullScreen
  />
);
