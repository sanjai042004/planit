export const Hero = ({ onLogin }) => {
  return (
    <section className="flex flex-col items-center text-center mt-40 px-4">
      <h1 className="text-4xl md:text-6xl font-bold">
        Organize your tasks,{" "}
        <span className="text-teal-500">achieve your goals</span>
      </h1>

      <p className="mt-10 text-gray-500 max-w-2xl">
        PlanIt helps you manage projects, collaborate with your team, and get
        things done.
      </p>

      <div className="flex gap-4 mt-10 flex-wrap justify-center">
        <button
          onClick={onLogin}
          className="flex items-center gap-3 border border-gray-100 px-4 py-3 rounded-xl shadow cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <button
          onClick={onLogin}
          className="bg-teal-500 text-white px-6 py-3 rounded-xl cursor-pointer"
        >
          Get Started Free →
        </button>
      </div>
    </section>
  );
};
