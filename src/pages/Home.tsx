import { Link } from "react-router-dom";
import { CCBox } from "../style/Box";
import { Button, ButtonGroup } from "../components/Button/index";


const Home = () => {
    return (
        <CCBox>
            <ButtonGroup direction="vertical" gap="12px">
                <Button variant="primary">
                    <Link to="/button" style={{ display: 'block', margin: '20px 0'}}>
                        버튼 데모
                    </Link>
                </Button>
                <Button variant="secondary">
                    <Link to="/input" style={{ display: 'block', margin: '20px 0'}}>
                        인풋 데모
                    </Link>
                </Button>
            </ButtonGroup>
        </CCBox>
    );
};

export default Home;

