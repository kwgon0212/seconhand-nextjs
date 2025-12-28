import getCurrentUser from "@/app/actions/getCurrentUser";

const UserPage = async () => {
  const userData = await getCurrentUser();

  console.log("userData", userData);
  return <div>사용자 페이지</div>;
};

export default UserPage;
