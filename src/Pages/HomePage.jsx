import { useAuth } from "../hook/useAuth";

export default function HomePage() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <>
      <p> home page</p>
    </>
  );
}
