export interface ConversionInput {
  placement: 'header' | 'hero' | 'gallery' | 'story' | 'contact';
  productId?: string;
}

/** Ponto de integração: substituir o corpo por uma chamada ao Worker. */
export async function trackConversion(_input: ConversionInput): Promise<void> {
  // Mock intencionalmente vazio. Nenhum dado é enviado ou armazenado.
  // Futuro: POST /api/conversions; a gravação no KV pertence ao Worker.
}
