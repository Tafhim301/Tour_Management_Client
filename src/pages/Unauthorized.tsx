import { Button } from "@/components/ui/button";
import { Link } from "react-router";


export default function Unauthorized() {
    return (
        <div>
            <h5>
            You are unauthorized
        </h5>

            <Link to={"/"}>
                <Button>Go Home</Button>
            </Link>
        </div>



    )
}
