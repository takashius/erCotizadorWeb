// import { useParams } from 'react-router-dom'
import { Table, Button, Descriptions, Card } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { QuotationDetail, Product } from '../types'
import { useState } from 'react'
import FloatingMenu from '../components/FloatingMenu'
import ProductFormDrawer from '../components/ProductFormDrawer'
import { useTranslation } from 'react-i18next'

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
  const [drawerVisible, setDrawerVisible] = useState(false)
  const { t } = useTranslation()

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

  const handleMenuClick = (key: string) => {
    console.log(`Clicked menu item: ${key}`)
  }

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const closeDrawer = () => {
    setDrawerVisible(false)
  }

  const handleFormSubmit = (values: any) => {
    console.log('Form values:', values)
    closeDrawer()
    // Aquí puedes manejar la lógica para agregar el producto a la cotización
  }

  return (
    <>
      <div className="flex mb-4">
        <Card title={quotation.title} bordered={false} style={{ width: '50%', marginRight: '8px' }}>
          <Descriptions bordered column={2}>
            <Descriptions.Item label={t('quotationDetails.invoiceNumber')}>{quotation.number}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.date')}>{quotation.date}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.subtotal')}>{`$${quotation.amount.toFixed(2)}`}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.tax')}>{`$${quotation.totalIva.toFixed(2)}`}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.total')}>{`$${quotation.total.toFixed(2)}`}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.exchangeRate')}>{quotation.rate}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title={`${quotation.customer.name} ${quotation.customer.lastname}`} bordered={false} style={{ width: '50%', marginLeft: '8px' }}>
          <Descriptions bordered column={2}>
            <Descriptions.Item label={t('quotationDetails.customerTitle')}>{quotation.customer.title}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.email')}>{quotation.customer.email}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.phone')}>{quotation.customer.phone}</Descriptions.Item>
            <Descriptions.Item label={t('quotationDetails.taxId')}>{quotation.customer.rif}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <Card title={
        <div className="flex justify-between items-center">
          <span>{t('quotationDetails.productTableTitle')}</span>
          <Button
            type="primary"
            onClick={showDrawer}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            {t('quotationDetails.addProductButton')}
          </Button>
        </div>
      } bordered={false}>
        <Table columns={columns} dataSource={quotation.products} rowKey="_id" />
      </Card>

      <ProductFormDrawer
        visible={drawerVisible}
        onClose={closeDrawer}
        onSubmit={handleFormSubmit}
      />
      <FloatingMenu onMenuClick={handleMenuClick} />
    </>
  )
}

export default QuotationDetails
