import {useAuth} from '../../hooks/useAuth.js'

export default function Dashboard() {
    const {user} = useAuth();

    return (
        <>
            <h2>Dashboard </h2>
            <h3>Welcome {user.username?user.username:user.email}</h3>
        </>
    );
};