// Script para gerar PDF do repertório
(function() {
    'use strict';

    // Função para gerar PDF usando html2canvas e jsPDF
    window.gerarPDF = function() {
        const btnGerarPDF = document.getElementById('btnGerarPDF');
        const originalText = btnGerarPDF.innerHTML;
        
        // Mostrar loading
        btnGerarPDF.disabled = true;
        btnGerarPDF.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando PDF...';
        
        // Mostrar versão PDF antes de capturar
        const elemento = document.getElementById('repertorioPDFView');
        if (!elemento) {
            alert('Erro: Elemento PDF não encontrado.');
            btnGerarPDF.disabled = false;
            btnGerarPDF.innerHTML = originalText;
            return;
        }
        
        // Tornar visível temporariamente para captura
        elemento.style.display = 'block';
        elemento.style.position = 'absolute';
        elemento.style.left = '-9999px';
        
        // Configurações para html2canvas - otimizado para uma página
        const opcoes = {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: elemento.scrollWidth,
            height: elemento.scrollHeight,
            windowWidth: elemento.scrollWidth,
            windowHeight: elemento.scrollHeight
        };
        
        html2canvas(elemento, opcoes).then(canvas => {
            const imgData = canvas.toDataURL('image/png', 0.95);
            
            // Verificar qual versão do jsPDF está disponível
            let pdf;
            if (typeof jspdf !== 'undefined' && jspdf.jsPDF) {
                pdf = new jspdf.jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4',
                    compress: true
                });
            } else if (typeof window.jspdf !== 'undefined' && window.jspdf.jsPDF) {
                pdf = new window.jspdf.jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4',
                    compress: true
                });
            } else {
                // Fallback: abrir diálogo de impressão
                alert('Biblioteca PDF não disponível. Use a opção de Imprimir.');
                window.print();
                btnGerarPDF.disabled = false;
                btnGerarPDF.innerHTML = originalText;
                return;
            }
            
            const imgWidth = 190; // A4 width - margens (210mm - 20mm)
            const pageHeight = 277; // A4 height - margens (297mm - 20mm)
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            // Ajustar altura para caber em uma página
            let finalHeight = imgHeight;
            if (imgHeight > pageHeight) {
                // Se exceder, reduzir proporcionalmente
                finalHeight = pageHeight;
                const scaleFactor = pageHeight / imgHeight;
                const scaledWidth = imgWidth * scaleFactor;
                pdf.addImage(imgData, 'PNG', (210 - scaledWidth) / 2, 10, scaledWidth, finalHeight);
            } else {
                // Centralizar verticalmente se couber
                const verticalOffset = (pageHeight - imgHeight) / 2;
                pdf.addImage(imgData, 'PNG', 10, verticalOffset, imgWidth, imgHeight);
            }
            
            // Salvar PDF
            pdf.save('repertorio-banda-racional.pdf');
            
            // Ocultar versão PDF novamente
            elemento.style.display = 'none';
            elemento.style.position = '';
            elemento.style.left = '';
            
            // Restaurar botão
            btnGerarPDF.disabled = false;
            btnGerarPDF.innerHTML = originalText;
        }).catch(error => {
            console.error('Erro ao gerar PDF:', error);
            alert('Erro ao gerar PDF. Por favor, use a opção de Imprimir.');
            
            // Restaurar botão
            btnGerarPDF.disabled = false;
            btnGerarPDF.innerHTML = originalText;
        });
    };

    // Adicionar estilos de impressão quando a página carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            adicionarEstilosImpressao();
        });
    } else {
        adicionarEstilosImpressao();
    }

    function adicionarEstilosImpressao() {
        // Adicionar estilos inline para garantir que funcionem na impressão
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                @page {
                    size: A4;
                    margin: 1cm;
                }
                
                body * {
                    visibility: hidden;
                }
                
                .repertorio-pdf-view,
                .repertorio-pdf-view * {
                    visibility: visible;
                }
                
                .repertorio-pdf-view {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
})();
