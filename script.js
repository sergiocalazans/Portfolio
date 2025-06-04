function enviarMsg(event){
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    const contato = '5541996678019';

    const texto = `Olá! Meu nome é ${nome}, ${mensagem}`;
    const msgFormatada = encodeURIComponent(texto);

    const url = `https://wa.me/${contato}?text=${msgFormatada}`;

    window.open(url, '_blank');
}




