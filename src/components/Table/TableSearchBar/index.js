import RegisterDialog from "../RegisterDialog";
import "./style.css"

export default function TableSearchBar({setSearchTerm}) {

    return (
        <div className="container">
            <div className="separator">
                <p style={{ fontSize: "22px" }}><strong>Usuário</strong></p>

                <input type="text" className="searchInput" onChange={(e) => {setSearchTerm(e.target.value)}}></input>
            </div>

            <RegisterDialog />
        </div>
    );
}