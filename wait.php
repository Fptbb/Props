<?php
    $dbc = "mysql:dbname=zera_dengue;host=localhost";
    $dbusuario = "root";
    $dbpass = "";

    $nome      = $_POST['nome'];
    $email     = $_POST['email'];
    $senha     = $_POST['senha'];
    $cpf       = $_POST['cpf'];
    $cep  = $_POST['cep'];
    $telefone  = $_POST['fone'];
    $numero    = $_POST['numerodacasa'];

    try{
        $pdo = new PDO($dbc, $dbusuario, $dbpass);			
        $sql = "INSERT INTO usuario SET nome = '$nome', email = '$email', senha = '$senha', cpf = '$cpf', 
        cep = '$cep', fone = '$telefone', numero = '$numero'";
        $sql = $pdo->query($sql);
        echo"Usuário Cadastrado";
    }catch(PDOException $e){
        echo "Conexão falhou".$e->getMessage();
    }
?>



<?php
    $dbc = "mysql:dbname=zera_dengue;host=localhost";
    $dbusuario = "root";
    $dbpass = "";

    $endereco      = $_POST['endereco'];
    $imagem        = $_FILES['img'];
    $mensagem      = $_POST['msg'];

    try{
        $pdo = new PDO($dbc, $dbusuario, $dbpass);	
        
        $nome_imagem = $imagem['name'];
        move_uploaded_file($imagem['tmp_name'],'dengueimg/'.$nome_imagem);	
        
        $sql = "INSERT INTO denuncia SET endereco = '$endereco', imagem = '$nome_imagem', mensagem = '$mensagem'";
        $sql = $pdo->query($sql);
        echo"Denuncia Realizada";
    }catch(PDOException $e){
        echo "Conexão  falhou".$e->getMessage();
    }
?>
