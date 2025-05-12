
import { useParams } from "react-router-dom";
import UserProfile from "@/components/UserProfile";

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  
  if (!userId) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="echo-card p-8 text-center">
            <h2 className="text-xl font-bold mb-2">User Not Found</h2>
            <p className="text-echo-muted">The user ID is invalid</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-3xl mx-auto">
        <UserProfile userId={userId} />
      </div>
    </div>
  );
};

export default UserDetail;
