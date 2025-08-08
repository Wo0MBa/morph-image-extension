function morphToShape(targetPath) {
    const morphPath = document.getElementById('morphPath');
    const morphClip = document.querySelector('#morphClip path') || 
                     document.querySelector('#morphClip rect, #morphClip circle');
    
    // Показываем путь для анимации
    morphPath.setAttribute('d', targetPath);
    morphPath.setAttribute('fill', 'none');
    morphPath.setAttribute('stroke', '#333');
    morphPath.setAttribute('stroke-width', '2');
    
    // Анимация морфинга
    const animation = morphPath.animate([
        { strokeDasharray: '0, 1000', opacity: 0 },
        { strokeDasharray: '1000, 1000', opacity: 1 }
    ], {
        duration: 2000,
        easing: 'ease-in-out'
    });
    
    // После анимации обновляем clip-path
    animation.onfinish = function() {
        // Создаем новый clipPath с формой
        const newClipPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        newClipPath.setAttribute('d', targetPath);
        newClipPath.setAttribute('fill', 'white');
        
        // Заменяем старый clipPath
        const clipDefs = document.getElementById('morphClip');
        clipDefs.innerHTML = '';
        clipDefs.appendChild(newClipPath);
        
        // Обновляем clip-path у изображения
        document.getElementById('morphImage').setAttribute('clip-path', 'url(#morphClip)');
        
        // Скрываем путь
        morphPath.setAttribute('stroke', 'none');
    };
}

function resetToOriginal() {
    const morphClip = document.getElementById('morphClip');
    const originalClip = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    originalClip.setAttribute('x', '0');
    originalClip.setAttribute('y', '0');
    originalClip.setAttribute('width', '300');
    originalClip.setAttribute('height', '300');
    
    morphClip.innerHTML = '';
    morphClip.appendChild(originalClip);
    
    document.getElementById('morphImage').setAttribute('clip-path', 'url(#morphClip)');
    
    // Скрываем путь морфинга
    document.getElementById('morphPath').setAttribute('stroke', 'none');
}
