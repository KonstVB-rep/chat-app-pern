import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-white p-4 rounded-full">
      <h1 className="text-[96px] font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Страница не найдена</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all cursor-pointer"
      >
        Вернуться на главную
      </button>
    </div>
  );
};

export default NotFoundPage;