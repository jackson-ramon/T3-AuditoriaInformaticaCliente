import { useEffect, useState } from 'react'
import {
  Container,
  Header,
  Content,
  Footer,
  Navbar,
  Nav,
  Panel,
  IconButton,
  Modal,
  Form,
  Button,
  SelectPicker,
  Table,
  Grid,
  Row,
  Col
} from 'rsuite';
import GearIcon from '@rsuite/icons/Gear';
import PlusIcon from '@rsuite/icons/Plus';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import RemindIcon from '@rsuite/icons/legacy/Remind';

import {
  columnsDatosHuerfanos,
  columnsValoresRepetidos,
  columnsCumplirFK,
  columnsIntegridadRefDelUpd,
  columnsIntegridadRefInser,
  columnsDefinicionesPK,
  columnsPosiblesRelacionesExis,
  columnsPosiblesRelacionesDebExis,
  columnsRelacionesExisten,
} from './assets/Constantes';

import 'rsuite/dist/rsuite.min.css';

const { Column, HeaderCell, Cell } = Table;

const credencialesDB = {
  dbName: '',
  dbUser: '',
  dbPassword: '',
};

const tiposAnomalias = [
  {
    label: 'Datos huerfanos',
    value: '1',
  },
  {
    label: 'Valores repetidos',
    value: '2',
  },
  {
    label: 'Cumplir FK',
    value: '3',
  },
  {
    label: 'Integridad referencial - eliminacion y actualizacion',
    value: '4',
  },
  {
    label: 'Integridad referencial para insercion',
    value: '5',
  },
  {
    label: 'Definicion de PK',
    value: '6',
  },
  {
    label: 'Posibles relaciones que existen (Triggers)',
    value: '7',
  },
  {
    label: 'Relaciones que deberian existir',
    value: '8',
  },
  {
    label: 'Relaciones que existen (FK)',
    value: '9',
  },
];

const columnsAnomalias = [
  {
    value: '1',
    columns: columnsDatosHuerfanos,
  },
  {
    value: '2',
    columns: columnsValoresRepetidos,
  },
  {
    value: '3',
    columns: columnsCumplirFK,
  },
  {
    value: '4',
    columns: columnsIntegridadRefDelUpd,
  },
  {
    value: '5',
    columns: columnsIntegridadRefInser,
  },
  {
    value: '6',
    columns: columnsDefinicionesPK,
  },
  {
    value: '7',
    columns: columnsPosiblesRelacionesExis,
  },
  {
    value: '8',
    columns: columnsPosiblesRelacionesDebExis,
  },
  {
    value: '9',
    columns: columnsRelacionesExisten,
  },
];

const URL_API = 'http://localhost:3000/api/auditoria';

function App() {
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false)
  const [anomaliaSelected, setAnomaliaSelected] = useState("");
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState({
    dbName: '',
    dbUser: '',
    dbPassword: '',
  });

  const resetForm = () => {
    setFormValue({
      dbName: '',
      dbUser: '',
      dbPassword: '',
    })
  };

  const handleOpen = () => {
    resetForm();
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const validateFom = () => {
    return formValue.dbName !== '' && formValue.dbUser !== '' && formValue.dbPassword !== '';
  }

  const handleGetParameters = () => {
    if (validateFom()) {
      credencialesDB.dbName = formValue.dbName;
      credencialesDB.dbUser = formValue.dbUser;
      credencialesDB.dbPassword = formValue.dbPassword;
      setOpen(false);
    } else {
      setOpenNotif(true);
    }
  };

  const handleCloseNotif = () => setOpenNotif(false);

  useEffect(() => {
    if (anomaliaSelected !== '') {
      fetchAnomalia1();
    }

  }, [anomaliaSelected]);

  const fetchAnomalia1 = async () => {
    try {
      const response = await fetch(`${URL_API}/${anomaliaSelected}?user=${credencialesDB.dbUser}&password=${credencialesDB.dbPassword}&database=${credencialesDB.dbName}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { result } = await response.json();
      console.log(result)
      setData(result);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const renderColumns = () => {
    const tableTarget = columnsAnomalias.find((col) => col.value === anomaliaSelected);
    return tableTarget.columns.map((col, index) => (
      <Column key={index} width={col.width} flexGrow={col.flexGrow || 0}>
        <HeaderCell>{col.header}</HeaderCell>
        <Cell dataKey={col.dataKey} />
      </Column>
    ));
  };


  return (
    <>
      <Modal backdrop="static" role="alertdialog" open={openNotif} onClose={handleCloseNotif} size="xs">
        <Modal.Body>
          <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
          Todos los campos son requeridos...
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseNotif} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Header>
          <Navbar appearance="inverse">
            <Navbar.Brand>Auditoria de Bases de Datos para SQL Server</Navbar.Brand>
          </Navbar>
        </Header>

        <Content style={{ margin: "20px" }}>
          <Panel header={<h4>Chequeo de anomalias</h4>} bordered>
            {/* Primera parte */}
            <h5>1. Ingreso de parametros para conexión a la base de datos</h5>
            <IconButton
              appearance="primary"
              color='green'
              icon={<PlusIcon />}
              style={{ margin: "10px" }}
              onClick={handleOpen}
            >
              Abrir formulario
            </IconButton>

            {/* Segunda parte, selector de anomalias */}
            {validateFom() && !open && (
              <>
                <h5>2. Selección de anomalias</h5>
                <SelectPicker
                  label="Tipo de anomalia"
                  data={tiposAnomalias}
                  searchable={false}
                  value={anomaliaSelected}
                  onChange={setAnomaliaSelected}
                  style={{ margin: "10px", width: 500 }}
                  onClean={() => setAnomaliaSelected('')}
                />
                <hr />
                {anomaliaSelected !== '' && (
                  <Table
                    data={data}
                    height={400}
                    autoHeight
                    bordered
                    cellBordered
                  >
                    {renderColumns()}
                  </Table>
                )}
              </>
            )

            }

          </Panel>
        </Content>

        <Footer>
          <Container>
            <Content style={{ textAlign: 'center', paddingTop: '10px' }}>
              <p>© 2024 Auditoria Informática. All rights reserved.</p>
            </Content>
          </Container>
        </Footer>
      </Container>

      {/* Modal para el ingreso de las credenciales para el acceso a la base de datos */}
      <Modal
        backdrop="static"
        keyboard={false}
        open={open}
        onClose={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Ingreso de parametros para conexión a la base de datos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            fluid
            onChange={setFormValue}
            formValue={formValue}
          >
            <Form.Group controlId="dbName">
              <Form.ControlLabel>Nombre de la base de datos </Form.ControlLabel>
              <Form.Control checkAsync name="dbName" placeholder="NOMBRE_BD" />
            </Form.Group>
            <Form.Group controlId="dbUser">
              <Form.ControlLabel>Usuario de la base de datos </Form.ControlLabel>
              <Form.Control checkAsync name="dbUser" placeholder="USUARIO_BD" />
            </Form.Group>
            <Form.Group controlId="dbPassword">
              <Form.ControlLabel>Contrasela del usuario ingresado </Form.ControlLabel>
              <Form.Control checkAsync name="dbPassword" placeholder="CONTRASEÑA_BD" />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <IconButton
            appearance="primary"
            color='green'
            icon={<CheckIcon />}
            onClick={handleGetParameters}
          >
            Ok
          </IconButton>
          <IconButton
            appearance="primary"
            color='red'
            icon={<CloseIcon />}
            onClick={handleClose}
          >
            Cancel
          </IconButton>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App
