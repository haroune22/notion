import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/axios";

export const AuthProvider = ( { children } ) => {

    const [ user, setUser ] = useState( null );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        const fetchUser = async () => {
            try {
                const res = await api.get(
                    "/auth/me",
                );
                setUser( res?.data?.user );
            } catch {
                setUser( null );
            } finally {
                setLoading( false );
            }
        };

        fetchUser();
    }, [ user ] );

    return (
        <AuthContext.Provider value={ { user, setUser, loading } }>
            { children }
        </AuthContext.Provider>
    )
}
