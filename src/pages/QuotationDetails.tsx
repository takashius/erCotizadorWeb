// import { useParams } from 'react-router-dom'
import { Table, Button, Descriptions, Card, Menu, FloatButton, Dropdown } from 'antd'
import { EditOutlined, DeleteOutlined, FilePdfOutlined, DollarOutlined, MailOutlined, PlusOutlined, MenuOutlined } from '@ant-design/icons'
import { QuotationDetail, Product } from '../types'
import { useState } from 'react'

// Ejemplo de cotización para propósitos de demostración
const exampleQuotation: QuotationDetail = {
  created: {
    user: { _id: "64fbe61071af3ad203dba8b8", name: "Erick", lastname: "Hernandez" },
    date: "2024-12-06T11:15:10.404Z"
  },
  _id: "6752dcbef524f5bd2211a93c",
  title: "Robótica mes Diciembre",
  description: "Correspondiente del 6/11 al 6/12",
  status: "open",
  number: 7,
  sequence: 7,
  amount: 124,
  date: "6/12/2024",
  company: {
    _id: "64fbed5f0b15f769275689cf",
    name: "ErDesarrollo",
    email: "erick@erdesarrollo.com.ve",
    phone: "04143168556",
    rif: "V161342366",
    address: "23 de Enero",
    logo: "https://res.cloudinary.com/erdesarrollo/image/upload/v1709505386/cotizador/g94nkodhrtelyqtfcrkr.png",
    logoAlpha: "https://res.cloudinary.com/erdesarrollo/image/upload/v1694663890/Logo-ErDesarrollo_alpha_kbpksa.png"
  },
  customer: {
    _id: "6650c5e93e72276079ef1166",
    title: "María del Rosario",
    name: "Maria",
    lastname: "Del Rosario",
    rif: "V-03714173-5",
    email: "mariadelrosariopreescolar@gmail.com",
    phone: "02124624364",
    addresses: [
      {
        title: "Default",
        city: "Caracas",
        line1: "Av San Martín, Cruz de la Vega a Rio",
        line2: "",
        zip: "1020",
        default: true,
        _id: "6650c5e93e72276079ef1167"
      }
    ]
  },
  rate: 48.33,
  discount: 0,
  typeDiscount: "percentage",
  products: [
    {
      master: "666318880974d7f6ee0951cb",
      name: "Horas académicas",
      description: "",
      price: 3,
      amount: 28,
      iva: false,
      _id: "6752dcd98445f896167261cf"
    },
    {
      master: "672bdcf7212391d4fff474cc",
      name: "Alquiler Laptop para actividades académicas",
      description: "",
      price: 20,
      amount: 2,
      iva: false,
      _id: "6752dce4f524f5bd2211a9a2"
    }
  ],
  totalIva: 0,
  total: 124
}

const QuotationDetails = () => {
  // const { id } = useParams<{ id: string }>()
  const quotation = exampleQuotation;
  const [menuVisible, setMenuVisible] = useState(false)

  const columns = [
    {
      title: 'Título',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Cantidad',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Precio Total',
      key: 'totalPrice',
      render: (_: any, product: Product) => `$${(product.price * product.amount).toFixed(2)}`,
    },
    {
      title: 'IVA',
      dataIndex: 'iva',
      key: 'iva',
      render: (iva: boolean) => (iva ? 'Sí' : 'No'),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: () => (
        <Button.Group>
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} />
        </Button.Group>
      ),
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    // Aquí puedes manejar las acciones según la opción seleccionada
    console.log(`Clicked menu item: ${key}`)
  }

  const menu = (
    <Menu onClick={handleMenuClick} className="bg-blue-500 text-white">
      <Menu.Item key="edit" icon={<EditOutlined />} className="hover:bg-blue-600">
        Editar
      </Menu.Item>
      <Menu.Item key="generate-pdf" icon={<FilePdfOutlined />} className="hover:bg-blue-600">
        Generar PDF
      </Menu.Item>
      <Menu.Item key="pdf-forma-libre" icon={<FilePdfOutlined />} className="hover:bg-blue-600">
        PDF Forma Libre
      </Menu.Item>
      <Menu.Item key="update-rate" icon={<DollarOutlined />} className="hover:bg-blue-600">
        Actualizar Tasa
      </Menu.Item>
      <Menu.Item key="send-email" icon={<MailOutlined />} className="hover:bg-blue-600">
        Enviar por Correo
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <div className="flex mb-4">
        <Card title={quotation.title} bordered={false} style={{ width: '50%', marginRight: 8 }}>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Número de Factura">{quotation.number}</Descriptions.Item>
            <Descriptions.Item label="Fecha">{quotation.date}</Descriptions.Item>
            <Descriptions.Item label="Subtotal">{`$${quotation.amount.toFixed(2)}`}</Descriptions.Item>
            <Descriptions.Item label="IVA">{`$${quotation.totalIva.toFixed(2)}`}</Descriptions.Item>
            <Descriptions.Item label="Total">{`$${quotation.total.toFixed(2)}`}</Descriptions.Item>
            <Descriptions.Item label="Tasa de Cambio">{quotation.rate}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title={`${quotation.customer.name} ${quotation.customer.lastname}`} bordered={false} style={{ width: '50%', marginLeft: 8 }}>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Título">{quotation.customer.title}</Descriptions.Item>
            <Descriptions.Item label="Correo Electrónico">{quotation.customer.email}</Descriptions.Item>
            <Descriptions.Item label="Teléfono">{quotation.customer.phone}</Descriptions.Item>
            <Descriptions.Item label="RIF">{quotation.customer.rif}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <Card title="Productos" bordered={false}>
        <Table columns={columns} dataSource={quotation.products} rowKey="_id" />
      </Card>

      <Dropdown overlay={menu} trigger={['click']}>
        <Button
          type="primary"
          shape="circle"
          icon={<MenuOutlined />}
          size="large"
          onClick={() => setMenuVisible(!menuVisible)}
          className="fixed top-20 right-5 bg-blue-500 text-white hover:bg-blue-600"
        />
      </Dropdown>
    </>
  )
}

export default QuotationDetails
