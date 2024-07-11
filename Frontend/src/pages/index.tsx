import LoginForm from "../components/auth/loginForm";

interface IndexPageProps {
  onLogin: () => void;
}

export default function IndexPage({ onLogin }: IndexPageProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm onLogin={onLogin} />
    </div>
  );
}
