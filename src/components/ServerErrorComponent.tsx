export default function ErrorComponent({error}: {error: unknown}) {
  return (
    <div>
      <h1>Error occurred during server-side rendering</h1>
      <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
    </div>
  );
}
