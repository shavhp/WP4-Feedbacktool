// Source:
// https://reactstrap.github.io/?path=/docs/components-card--card

import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";


function Homepage() {
    return(
        <div
            style={{
                margin: '30px'
            }}
        >
            <h2>Dashboard</h2>
        <Card
            color="light"
            style={{
                width: '18rem',
                height: '7rem',
                margin: '20px 0'
            }}
        >
            <CardBody>
                <CardTitle
                    tag="h5"
                >
                    Meerkeuzevragen
                </CardTitle>
                <Link to="/mcQuestions">
                <Button>
                    Ga
                </Button>
                    </Link>
            </CardBody>
        </Card>
        <Card
            color="light"
            style={{
                width: '18rem',
                height: '7rem',
                margin: '20px 0'
            }}
        >
            <CardBody>
                <CardTitle
                    tag="h5"
                >
                    Open vragen
                </CardTitle>
                <Link to="/openQuestions">
                <Button>
                    Ga
                </Button>
                    </Link>
            </CardBody>
        </Card>
            <Card
            color="light"
            style={{
                width: '18rem',
                height: '7rem',
                margin: '20px 0'
            }}
        >
            <CardBody>
                <CardTitle
                    tag="h5"
                >
                    Vragenlijsten
                </CardTitle>
                <Link to="/forms">
                <Button>
                    Ga
                </Button>
                    </Link>
            </CardBody>
        </Card>
            </div>

    )
}

export default Homepage;