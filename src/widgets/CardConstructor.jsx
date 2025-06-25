import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { QRCodeCanvas } from 'qrcode.react';
import Barcode from 'react-barcode';

// Глобальные стили (inline)
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: "'Roboto', sans-serif",
  padding: '40px 20px',
  background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
  minHeight: '100vh',
};

const headerStyle = {
  fontSize: '32px',
  fontWeight: '600',
  marginBottom: '30px',
  color: '#333',
  textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
};

const mainWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '30px',
  width: '100%',
};

const formContainer = {
  flex: '1',
  minWidth: '320px',
  maxWidth: '450px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  padding: '30px',
};

const previewContainer = {
  flex: '1',
  minWidth: '320px',
  maxWidth: '450px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  padding: '30px',
  textAlign: 'center'
};

const labelStyle = {
  fontWeight: '500',
  display: 'block',
  marginBottom: '6px',
  color: '#555',
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid #ddd',
  marginBottom: '16px',
  fontSize: '14px',
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: '80px',
};

const buttonStyle = {
  padding: '12px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '10px',
  transition: 'background-color 0.3s ease',
};

const buttonHoverStyle = {
  backgroundColor: '#0056b3'
};

// Анимация появления
const fadeInStyle = {
  animation: 'fadeIn 0.6s ease-in-out'
};

const globalKeyframes = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

// Компонент карты, оформленной в стиле Apple/Google Wallet с доработанным дизайном
function LoyaltyCard({
  brandLogo,
  discount,
  offerTitle,
  offerSubtitle,
  ownerName,
  detailsText,
  dishImage,
  codeType,
  codeValue,
  cardBackground,
  textColor,
}) {
  const cardStyle = {
    width: '300px',
    height: '440px',
    borderRadius: '16px',
    background: cardBackground || 'linear-gradient(135deg, #1b1b1b, #434343)',
    color: textColor || '#fff',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '0 auto',
    ...fadeInStyle,
  };

  const topRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const brandLogoStyle = {
    height: '28px',
    objectFit: 'contain',
  };

  const discountStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '6px 10px',
    borderRadius: '6px',
  };

  const offerTitleStyle = {
    marginTop: '14px',
    marginBottom: '14px',
    fontSize: '18px',
    lineHeight: '1.4',
    color: '#5efc82',
    fontWeight: '500',
  };

  const dishImageWrapperStyle = {
    position: 'absolute',
    top: '70px',
    right: '20px',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid rgba(255,255,255,0.3)',
    display: dishImage ? 'block' : 'none',
  };

  const dishImgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const ownerBlockStyle = {
    fontSize: '16px',
    marginBottom: '8px',
  };

  const codeBlockStyle = {
    marginTop: '12px',
    textAlign: 'center'
  };

  return (
    <div style={cardStyle}>
      {/* Верхняя часть */}
      <div>
        <div style={topRowStyle}>
          {brandLogo && <img src={brandLogo} alt="Логотип" style={brandLogoStyle} />}
          {discount && <div style={discountStyle}>{discount}</div>}
        </div>
        <div style={offerTitleStyle}>
          {offerTitle}
          <br />
          {offerSubtitle}
        </div>
        <div style={dishImageWrapperStyle}>
          {dishImage && <img src={dishImage} alt="Блюдо" style={dishImgStyle} />}
        </div>
      </div>
      {/* Нижняя часть */}
      <div>
        {ownerName && (
          <div style={ownerBlockStyle}>
            <strong>Владелец:</strong> {ownerName}
          </div>
        )}
        {detailsText && (
          <div style={{ fontSize: '14px', marginBottom: '8px' }}>
            <strong>Подробнее:</strong> {detailsText}
          </div>
        )}
        {codeType && (
          <div style={codeBlockStyle}>
            <div style={{ fontSize: '13px', marginBottom: '6px' }}>
              <strong>{codeType === 'QR' ? 'QR-код' : 'Штрихкод'}</strong>
            </div>
            {codeType === 'QR' ? (
              <QRCodeCanvas value={codeValue} size={110} bgColor="transparent" fgColor={textColor} />
            ) : (
              <Barcode value={codeValue} width={2} height={60} fontSize={14} background="#f2f2f2" lineColor="#333" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Основной компонент-конструктор
function CardConstructor() {
  // Поля формы
  const [brandLogo, setBrandLogo] = useState('');
  const [discount, setDiscount] = useState('');
  const [offerTitle, setOfferTitle] = useState('');
  const [offerSubtitle, setOfferSubtitle] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [detailsText, setDetailsText] = useState('');
  const [dishImage, setDishImage] = useState('');
  const [codeType, setCodeType] = useState('QR'); // выбор: QR или Штрихкод
  const [cardBackground, setCardBackground] = useState('#1b1b1b');
  const [textColor, setTextColor] = useState('#ffffff');

  // Генерация случайного кода
  const generateRandomCode = () => Math.floor(100000 + Math.random() * 900000).toString();
  const [codeValue, setCodeValue] = useState(generateRandomCode());

  const regenerateCode = () => setCodeValue(generateRandomCode());

  return (
    <div style={containerStyle}>
      <style>{globalKeyframes}</style>
      <h1 style={headerStyle}>Конструктор Электронных Карт</h1>
      <div style={mainWrapperStyle}>
        {/* Форма */}
        <div style={formContainer}>
          <label style={labelStyle}>Логотип (URL):</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="https://..."
            value={brandLogo}
            onChange={(e) => setBrandLogo(e.target.value)}
          />
          <label style={labelStyle}>Скидка / Акция:</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Например: Скидка 10%"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <label style={labelStyle}>Основной текст:</label>
          <textarea
            style={textareaStyle}
            placeholder="Введите основной текст"
            value={offerTitle}
            onChange={(e) => setOfferTitle(e.target.value)}
          />
          <label style={labelStyle}>Подзаголовок:</label>
          <textarea
            style={textareaStyle}
            placeholder="Введите подзаголовок"
            value={offerSubtitle}
            onChange={(e) => setOfferSubtitle(e.target.value)}
          />
          <label style={labelStyle}>Владелец карты:</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Имя владельца"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
          <label style={labelStyle}>Подробнее (текст/ссылка):</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Введите детали"
            value={detailsText}
            onChange={(e) => setDetailsText(e.target.value)}
          />
          <label style={labelStyle}>Изображение блюда (URL):</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="https://..."
            value={dishImage}
            onChange={(e) => setDishImage(e.target.value)}
          />
          <label style={labelStyle}>Тип кода:</label>
          <select
            style={inputStyle}
            value={codeType}
            onChange={(e) => {
              setCodeType(e.target.value);
              regenerateCode();
            }}
          >
            <option value="QR">QR-код</option>
            <option value="Штрихкод">Штрихкод</option>
          </select>
          <label style={labelStyle}>Цвет фона карты:</label>
          <input
            style={inputStyle}
            type="color"
            value={cardBackground}
            onChange={(e) => setCardBackground(e.target.value)}
          />
          <label style={labelStyle}>Цвет текста:</label>
          <input
            style={inputStyle}
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
          <button style={buttonStyle} onClick={regenerateCode}>
            Обновить код
          </button>
        </div>

        {/* Предпросмотр */}
        <div style={previewContainer}>
          <h2 style={{ marginBottom: '20px' }}>Предпросмотр</h2>
          <LoyaltyCard
            brandLogo={brandLogo}
            discount={discount}
            offerTitle={offerTitle}
            offerSubtitle={offerSubtitle}
            ownerName={ownerName}
            detailsText={detailsText}
            dishImage={dishImage}
            codeType={codeType}
            codeValue={codeValue}
            cardBackground={cardBackground}
            textColor={textColor}
          />
          <button
            style={{ ...buttonStyle, marginTop: '30px' }}
            onClick={() => alert('Сохранение макета (логика отправки данных)')}
          >
            Сохранить макет
          </button>
        </div>
      </div>
    </div>
  );
}

// Рендер приложения (React 18)
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<CardConstructor />);

export default CardConstructor;