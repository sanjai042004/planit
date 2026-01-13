import { ListTodo, PieChart, Zap } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export const Features = () => {
  return (
    <section id="features" className="mt-20 max-w-6xl mx-auto px-6">
      <div className="grid gap-8 md:grid-cols-3">
        <FeatureCard
          icon={<ListTodo />}
          title="Task Management"
          desc="Create, edit, and track tasks easily."
          color="bg-teal-50 text-teal-500"
        />

        <FeatureCard
          icon={<PieChart />}
          title="Progress Tracking"
          desc="Visualize productivity with insights."
          color="bg-blue-50 text-blue-500"
        />

        <FeatureCard
          icon={<Zap />}
          title="Simple & Fast"
          desc="Instant Google login with clean UI."
          color="bg-purple-50 text-purple-500"
        />
      </div>
    </section>
  );
};
