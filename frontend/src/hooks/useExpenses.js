import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    useEffect(() => {
        const getExpenses = async () => {
            const { data } = await supabase.from("Expense").select();
            console.log(data);

            setExpenses(data || []);
        };
        getExpenses();

    }, []);
    return expenses;
}