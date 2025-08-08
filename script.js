document.addEventListener('DOMContentLoaded', function() {
    const imageUrlInput = document.getElementById('imageUrl');
    const shapeSelect = document.getElementById('shapeSelect');
    const morphBtn = document.getElementById('morphBtn');
    const resetBtn = document.getElementById('resetBtn');
    const morphImage = document.getElementById('morphImage');
    const morphPath = document.getElementById('morphPath');
    const morphClip = document.getElementById('morphClip');

    // Инициализация изображения
    morphImage.setAttribute('href', imageUrlInput.value);

    // Обновление изображения при изменении URL
    imageUrlInput.addEventListener('change', function() {
        morphImage.setAttribute('href', this.value);
    });

    // Кнопка морфинга
    morphBtn.addEventListener('click', function() {
        const selectedShape = shapeSelect.value;
        const shapePath = getShapePath(selectedShape);
        
        // Запуск морфинга
        morphToShape(shapePath);
    });

    // Кнопка сброса
    resetBtn.addEventListener('click', function() {
        resetToOriginal();
    });

    // Функция получения путей для разных форм
    function getShapePath(shape) {
        const centerX = 150;
        const centerY = 150;
        const radius = 120;

        switch(shape) {
            case 'circle':
                return `M ${centerX},${centerY - radius} 
                        A ${radius},${radius} 0 1,1 ${centerX},${centerY + radius}
                        A ${radius},${radius} 0 1,1 ${centerX},${centerY - radius} Z`;
            
            case 'heart':
                return `M ${centerX},${centerY + 30}
                        C ${centerX + 60},${centerY - 30} ${centerX + 120},${centerY} ${centerX},${centerY + 120}
                        C ${centerX - 120},${centerY} ${centerX - 60},${centerY - 30} ${centerX},${centerY + 30} Z`;
            
            case 'star':
                let points = [];
                for(let i = 0; i < 10; i++) {
                    const angle = (i * Math.PI / 5) - Math.PI / 2;
                    const distance = i % 2 === 0 ? radius : radius * 0.4;
                    const x = centerX + Math.cos(angle) * distance;
                    const y = centerY + Math.sin(angle) * distance;
                    points.push(`${x},${y}`);
                }
                return `M ${points.join(' L ')} Z`;
            
            case 'triangle':
                const height = radius * Math.sqrt(3);
                return `M ${centerX},${centerY - height/2}
                        L ${centerX + radius},${centerY + height/2}
                        L ${centerX - radius},${centerY + height/2} Z`;
            
            case 'hexagon':
                let hexPoints = [];
                for(let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI / 3) - Math.PI / 6;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    hexPoints.push(`${x},${y}`);
                }
                return `M ${hexPoints.join(' L ')} Z`;
            
            default:
                return `M 0,0 L 300,0 L 300,300 L 0,300 Z`;
        }
    }
});
