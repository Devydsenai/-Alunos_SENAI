/**
 * 🎨 Sistema de Cores Profissional - Cinema App
 * 
 * Paleta moderna inspirada em Netflix, Disney+ e Apple TV+
 */

// ========================================
// 🔴 CORES PRINCIPAIS (Brand)
// ========================================

export const vermelhoPrimario = '#E50914';    // Vermelho Netflix
export const vermelhoHover = '#F40612';        // Hover/Active
export const vermelhoEscuro = '#B20710';       // Escuro
export const vermelhoGradiente1 = '#E50914';   // Gradiente início
export const vermelhoGradiente2 = '#8B0000';   // Gradiente fim

// ========================================
// ⚫ FUNDOS MODERNOS
// ========================================

export const pretoProfundo = '#000000';        // Preto puro (telas principais)
export const pretoSuave = '#0A0A0A';          // Preto suave
export const cinzaProfundo = '#0F0F0F';       // Cards principais
export const cinzaEscuro = '#141414';          // Fundo secundário
export const cinzaMedio = '#1A1A1A';           // Cards hover
export const cinzaCard = '#181818';            // Cards padrão
export const cinzaBorda = '#2A2A2A';           // Bordas sutis
export const cinzaClaro = '#333333';           // Separadores

// ========================================
// 📝 TEXTOS ELEGANTES
// ========================================

export const brancoTotal = '#FFFFFF';          // Títulos principais
export const brancoSuave = '#F5F5F5';         // Texto normal
export const cinzaTexto = '#B3B3B3';          // Texto secundário
export const cinzaTextoClaro = '#CCCCCC';     // Texto terciário
export const cinzaTextoEscuro = '#8C8C8C';    // Texto desabilitado

// ========================================
// 🌟 DESTAQUES PREMIUM
// ========================================

export const douradoPremium = '#FFD700';       // ⭐ Estrelas/Rating
export const douradoClaro = '#FFC107';         // Badges especiais
export const amareloDestaque = '#FFEB3B';      // Alertas importantes

export const azulInfo = '#2196F3';             // Informações
export const azulClaro = '#64B5F6';            // Info secundária
export const azulEscuro = '#1976D2';           // Links

export const verdeAcento = '#00E676';          // Sucesso/Disponível
export const verdeSucesso = '#4CAF50';         // Confirmações
export const verdeEscuro = '#388E3C';          // Hover verde

export const laranjaAviso = '#FF9800';         // Avisos
export const laranjaClaro = '#FFB74D';         // Avisos leves
export const laranja = '#FF9800';              // Avisos (alias)

// ========================================
// 🎬 ESTADOS E INTERAÇÕES
// ========================================

export const vermelhoErro = '#F44336';         // Erros
export const rosaDestaque = '#E91E63';         // Badges especiais

export const cinzaDesabilitado = '#424242';    // Elementos desabilitados
export const cinzaPlaceholder = '#757575';     // Placeholders

// ========================================
// 🌈 GRADIENTES MODERNOS
// ========================================

export const gradienteVermelho = 'linear-gradient(135deg, #E50914 0%, #B20710 100%)';
export const gradienteEscuro = 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)';
export const gradienteOverlay = 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)';

// ========================================
// 💎 TRANSPARÊNCIAS ELEGANTES
// ========================================

export const transparente = 'transparent';
export const pretoTransparente10 = 'rgba(0, 0, 0, 0.1)';
export const pretoTransparente20 = 'rgba(0, 0, 0, 0.2)';
export const pretoTransparente30 = 'rgba(0, 0, 0, 0.3)';
export const pretoTransparente50 = 'rgba(0, 0, 0, 0.5)';
export const pretoTransparente70 = 'rgba(0, 0, 0, 0.7)';
export const pretoTransparente80 = 'rgba(0, 0, 0, 0.8)';
export const pretoTransparente90 = 'rgba(0, 0, 0, 0.9)';

export const brancoTransparente10 = 'rgba(255, 255, 255, 0.1)';
export const brancoTransparente20 = 'rgba(255, 255, 255, 0.2)';
export const brancoTransparente30 = 'rgba(255, 255, 255, 0.3)';

export const vermelhoTransparente10 = 'rgba(229, 9, 20, 0.1)';
export const vermelhoTransparente20 = 'rgba(229, 9, 20, 0.2)';
export const vermelhoTransparente30 = 'rgba(229, 9, 20, 0.3)';

export const verdeTransparente20 = 'rgba(0, 230, 118, 0.2)';
export const laranjaTransparente20 = 'rgba(255, 152, 0, 0.2)';
export const laranjaTransparente = 'rgba(255, 152, 0, 0.2)';

// ========================================
// 🎯 SHADOWS E EFEITOS
// ========================================

export const sombraPequena = '0px 2px 4px rgba(0, 0, 0, 0.3)';
export const sombraMedia = '0px 4px 8px rgba(0, 0, 0, 0.4)';
export const sombraGrande = '0px 8px 16px rgba(0, 0, 0, 0.5)';
export const sombraCard = '0px 4px 12px rgba(0, 0, 0, 0.6)';

// ========================================
// 📦 TEMA COMPLETO ORGANIZADO
// ========================================

export const tema = {
  // Cores principais
  cores: {
    primaria: vermelhoPrimario,
    primariaHover: vermelhoHover,
    primariaEscura: vermelhoEscuro,
    
    fundo: pretoProfundo,
    fundoSecundario: cinzaEscuro,
    fundoCard: cinzaCard,
    fundoCardHover: cinzaMedio,
    
    texto: brancoTotal,
    textoNormal: brancoSuave,
    textoSecundario: cinzaTexto,
    textoTerciario: cinzaTextoClaro,
    
    destaque: douradoPremium,
    sucesso: verdeAcento,
    erro: vermelhoErro,
    aviso: laranjaAviso,
    info: azulInfo,
    
    borda: cinzaBorda,
    separador: cinzaClaro,
    desabilitado: cinzaDesabilitado,
  },
  
  // Espaçamentos consistentes
  espacamentos: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 48,
  },
  
  // Border radius modernos
  borderRadius: {
    pequeno: 4,
    medio: 8,
    grande: 12,
    extraGrande: 16,
    circular: 9999,
  },
  
  // Tipografia profissional
  fontes: {
    tamanhos: {
      tiny: 10,
      pequeno: 12,
      normal: 14,
      medio: 16,
      grande: 18,
      titulo: 20,
      tituloGrande: 24,
      display: 32,
      hero: 48,
    },
    pesos: {
      normal: '400',
      medio: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  
  // Elevações (shadows)
  elevacoes: {
    pequena: 2,
    media: 4,
    grande: 8,
    extraGrande: 12,
  },
};

// ========================================
// 🎨 EXPORTAÇÃO PADRÃO
// ========================================

export default {
  vermelhoPrimario,
  vermelhoHover,
  vermelhoEscuro,
  pretoProfundo,
  pretoSuave,
  cinzaProfundo,
  cinzaEscuro,
  cinzaMedio,
  cinzaCard,
  cinzaBorda,
  cinzaClaro,
  brancoTotal,
  brancoSuave,
  cinzaTexto,
  cinzaTextoClaro,
  douradoPremium,
  verdeAcento,
  laranjaAviso,
  azulInfo,
  vermelhoErro,
  cinzaDesabilitado,
  transparente,
  vermelhoTransparente20,
  laranjaTransparente,
  laranjaTransparente20,
  tema,
};

// Re-exportar cores comuns que podem estar faltando
export const branco = brancoTotal;
export const preto = pretoProfundo;
