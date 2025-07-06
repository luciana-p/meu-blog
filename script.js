// Aguarda o carregamento completo do documento para executar o código
$(document).ready(function () {

  // Aplica uma máscara de telefone no input com name="telefone" no formato (00) 00000-0000
  $('input[name="telefone"]').mask('(00) 00000-0000');

  // Adiciona um evento para o envio do formulário com id="formContato"
  $('#formContato').on('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário para validação manual

    // Captura e remove espaços em branco do início/fim dos valores dos campos
    const nome = this.nome.value.trim();
    const email = this.email.value.trim();
    const telefone = this.telefone.value.trim();
    const motivo = this.motivo.value;
    const mensagem = this.mensagem.value.trim();
    const botao = $(this).find('button[type="submit"]'); // Seleciona o botão de envio dentro do formulário

    // Validação do campo nome: obrigatório, apenas letras e espaços
    if (!nome || !/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
      alert('Por favor, preencha um nome válido (somente letras).');
      return; // Encerra a função para evitar envio
    }

    // Validação do email com expressão regular simples
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      alert('Por favor, preencha um e-mail válido.');
      return;
    }

    // Se telefone foi informado, verifica se tem pelo menos 8 números (ignorando símbolos)
    if (telefone && telefone.replace(/\D/g, '').length < 8) {
      alert('Se informar o telefone, digite pelo menos 8 números.');
      return;
    }

    // Valida se um motivo foi selecionado (campo obrigatório)
    if (!motivo) {
      alert('Por favor, selecione um motivo para o contato.');
      return;
    }

    // Valida se a mensagem tem pelo menos 10 caracteres
    if (mensagem.length < 10) {
      alert('Sua mensagem deve ter pelo menos 10 caracteres.');
      return;
    }

    // Altera o texto do botão para "Enviando..." e desabilita para evitar múltiplos cliques
    botao.text('Enviando...').prop('disabled', true);

    // Exibe a mensagem de sucesso (elemento com id="sucessoContato")
    $('#sucessoContato').fadeIn();

    // Envia o formulário após validações
    this.submit();
  });

  // Evento para o botão com id="verMais" que alterna a exibição das imagens extras
  $('#verMais').on('click', function () {
    $('.mais-imagens').slideToggle(); // Exibe ou oculta o bloco de imagens extras com efeito deslizante
    $(this).text(function (i, text) {
      // Alterna o texto do botão entre "Ver mais inspirações" e "Ver menos"
      return text === "Ver mais inspirações" ? "Ver menos" : "Ver mais inspirações";
    });
  });

  // Função para controlar o botão que leva ao topo da página
  const topoBtn = $('#topoBtn');

  // Mostra o botão "topo" quando o usuário desce a página mais de 100px, oculta caso contrário
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      topoBtn.fadeIn();
    } else {
      topoBtn.fadeOut();
    }
  });

  // Ao clicar no botão "topo", a página é animada para o topo em 600ms
  topoBtn.click(function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
    return false; // Impede o comportamento padrão do link
  });

});
