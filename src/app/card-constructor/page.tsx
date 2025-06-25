'use client'

import React, { useState } from 'react';
import { QRCode } from '@jackybaby/react-custom-qrcode';
import { Button } from '@/shared/ui/button';
import { Metadata } from 'next';

// Типы для пропсов LoyaltyCard
interface LoyaltyCardProps {
  brandLogo?: string;
  discount?: string;
  offerTitle?: string;
  offerSubtitle?: string;
  ownerName?: string;
  detailsText?: string;
  dishImage?: string;
  codeType?: string;
  codeValue: string;
  cardBackground?: string;
  textColor?: string;
}

// Глобальные стили с использованием Tailwind
const CardConstructor = () => {
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

  // Компонент карты, оформленной в стиле Apple/Google Wallet с доработанным дизайном
  const LoyaltyCard: React.FC<LoyaltyCardProps> = ({
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
  }) => {
    return (
      <div className="w-[300px] h-[440px] rounded-2xl text-white shadow-lg p-6 flex flex-col justify-between mx-auto"
           style={{ background: cardBackground || 'linear-gradient(135deg, #1b1b1b, #434343)', color: textColor || '#fff' }}>
        {/* Верхняя часть */}
        <div>
          <div className="flex justify-between items-center">
            {brandLogo && <img src={brandLogo} alt="Логотип" className="h-7 object-contain" />}
            {discount && <div className="text-sm font-bold bg-opacity-20 bg-white px-2.5 py-1.5 rounded-md">{discount}</div>}
          </div>
          <div className="mt-3.5 mb-3.5 text-lg leading-relaxed" style={{ color: '#5efc82' }}>
            {offerTitle}
            <br />
            {offerSubtitle}
          </div>
          <div className="absolute top-[70px] right-5 w-[100px] h-[100px] rounded-full overflow-hidden border-3 border-opacity-30 border-white"
               style={{ display: dishImage ? 'block' : 'none' }}>
            {dishImage && <img src={dishImage} alt="Блюдо" className="w-full h-full object-cover" />}
          </div>
        </div>
        
        {/* Нижняя часть */}
        <div>
          {ownerName && (
            <div className="text-base mb-2">
              <strong>Владелец:</strong> {ownerName}
            </div>
          )}
          {detailsText && (
            <div className="text-sm mb-2">
              <strong>Подробнее:</strong> {detailsText}
            </div>
          )}
          {codeType && (
            <div className="mt-3 text-center">
              <div className="text-sm mb-1.5">
                <strong>{codeType === 'QR' ? 'QR-код' : 'Штрихкод'}</strong>
              </div>
              {codeType === 'QR' ? (
                <QRCode 
                  value={codeValue} 
                  size={110} 
                  ecLevel="L"
                  quietZone={0}
                  bgColor="transparent" 
                  fgColor={textColor}
                  id="card-qr-code"
                />
              ) : (
                // Простая имитация штрих-кода, так как нет специальной библиотеки
                <div className="flex justify-center items-center h-[60px] w-full">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div 
                      key={index} 
                      className="h-full w-[2px] mx-[1px]" 
                      style={{ 
                        backgroundColor: textColor,
                        height: `${Math.max(40, Math.floor(Math.random() * 60))}px`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center font-sans p-10 bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800 shadow-sm">Конструктор Электронных Карт</h1>
      <div className="flex flex-wrap justify-center gap-8 w-full">
        {/* Форма */}
        <div className="flex-1 min-w-[320px] max-w-[450px] bg-white rounded-xl shadow-md p-8">
          <label className="font-medium block mb-1.5 text-gray-700">Логотип (URL):</label>
          <input
            className="w-full p-2.5 rounded-md border border-gray-300 mb-4 text-sm"
            type="text"
            placeholder="https://..."
            value={brandLogo}
            onChange={(e) => setBrandLogo(e.target.value)}
          />
          <label className="font-medium block mb-1.5 text-gray-700">Скидка / Акция:</label>
          <input
            className="w-full p-2.5 rounded-md border border-gray-300 mb-4 text-sm"
            type="text"
            placeholder="Например: Скидка 10%"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <label className="font-medium block mb-1.5 text-gray-700">Основной текст:</label>
          <textarea
            className="w-full p-2.5 rounded-md border border-gray-300 mb-4 text-sm resize-vertical min-h-[80px]"
            placeholder="Введите основной текст"
            value={offerTitle}
            onChange={(e) => setOfferTitle(e.target.value)}
          />
          <label className="font-medium block mb-1.5 text-gray-700">Подзаголовок:</label>
          <textarea
            className="w-full p-2.5 rounded-md border border-gray-300 mb-4 text-sm resize-vertical min-h-[80px]"
            placeholder="Введите подзаголовок"
            value={offerSubtitle}
            onChange={(e) => setOfferSubtitle(e.target.value)}
          />
          <label className="font-medium block mb-1.5 text-gray-700">Владелец карты:</label>
          <input
            className="w-full p-2.5 rounded-md border border-gray-300 mb-4 text-sm"
            type="text"
            placeholder="Имя владельца"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
          <label className="font-medium block mb-1.5 text-gray-700">Подробнее (текст/ссылка):</label>
          <input
            className="w-full p-2.5 rounded-md border border-gray-300 mb-4 text-sm"
            type="text"
            placeholder="Введите детали"
            value={detailsText}
            onChange={(e) => setDetailsText(e.target.value)}
          />
          <label className="font-medium block mb-1.5 text-gray-700">Изображение блюда (URL):</label>
          <input
            className="w-full p-2.5 rounded-md border border-gray-300 mb-4 text-sm"
            type="text"
            placeholder="https://..."
            value={dishImage}
            onChange={(e) => setDishImage(e.target.value)}
          />
          <label className="font-medium block mb-1.5 text-gray-700">Тип кода:</label>
          <select
            className="w-full p-2.5 rounded-md border border-gray-300 mb-4 text-sm"
            value={codeType}
            onChange={(e) => {
              setCodeType(e.target.value);
              regenerateCode();
            }}
          >
            <option value="QR">QR-код</option>
            <option value="Штрихкод">Штрихкод</option>
          </select>
          <label className="font-medium block mb-1.5 text-gray-700">Цвет фона карты:</label>
          <input
            className="w-full p-2.5 rounded-md border border-gray-300 mb-4 text-sm"
            type="color"
            value={cardBackground}
            onChange={(e) => setCardBackground(e.target.value)}
          />
          <label className="font-medium block mb-1.5 text-gray-700">Цвет текста:</label>
          <input
            className="w-full p-2.5 rounded-md border border-gray-300 mb-4 text-sm"
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
          <Button 
            onClick={regenerateCode}
          >
            Обновить код
          </Button>
        </div>

        {/* Предпросмотр */}
        <div className="flex-1 min-w-[320px] max-w-[450px] bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="mb-5">Предпросмотр</h2>
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
          <Button 
            className="mt-8"
            onClick={() => alert('Сохранение макета (логика отправки данных)')}
          >
            Сохранить макет
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardConstructor; 