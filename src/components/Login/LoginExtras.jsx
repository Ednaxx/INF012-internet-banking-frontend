import { Link } from "react-router";

const LoginExtras = () => {
  return (
    <>
      <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginExtras;
