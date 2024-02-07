import useUserInfo from "../Hooks/useUserInfo";

const Users = () => {
    const [users, refetch] = useUserInfo()

    return (
        <div>
            <div>
                {users.map(user=>
                    <div key={user._id}></div>
                    )}
            </div>
        </div>
    );
};

export default Users;