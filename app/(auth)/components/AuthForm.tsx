import Button from "@/components/Button";

export default function AuthForm() {
  return (
    <div className="flex space-x-3 ">
      <Button icon={"/images/profile.jpg"} type="outline">
        Register with Google
      </Button>
      <Button icon={"/images/profile.jpg"} type="outline">
        Register with Github
      </Button>
    </div>
  );
}
