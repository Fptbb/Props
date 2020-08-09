#Variaveis
$ProgressPreference="SilentlyContinue"
$url = "https://go.microsoft.com/fwlink/?Linkid=850641"
$output = "vscode.zip"
$DataFolder = "data"

#Popup Confirmation
Add-Type -AssemblyName PresentationCore,PresentationFramework
$ButtonType = [System.Windows.MessageBoxButton]::YesNo
$MessageIcon = [System.Windows.MessageBoxImage]::Warning
$MessageBody = "Esse script ira baixar e instalar o Code nessa pasta
Ele deletara TUDO que exceto o proprio script e a pasta data.
Garanta de nao executar esse script em uma pasta importante.
Ou seus arquivos serao deletados.

Quer continuar?"
$MessageTitle = "ALERTA"

$Result = [System.Windows.MessageBox]::Show($MessageBody,$MessageTitle,$ButtonType,$MessageIcon)


if($Result -eq "Yes") {
	#Baixa
	echo "Baixando $output"
	$wc = New-Object System.Net.WebClient
	$wc.DownloadFile($url, $output)

	#Remove todo o resto exceto a pasta data, script Update.ps1 e arquivo baixado
	echo "Limpando instalacao..."
	Get-ChildItem -Exclude $DataFolder,$output,$MyInvocation.MyCommand.Name | Remove-Item -Recurse -Force

	#Extrai o arquivo baixado
	echo "Extraindo $output"
	Expand-Archive -Path $output -DestinationPath ./

	#Remove o arquivo baixado
	echo "Deletando $output"
	Remove-Item $output

	#Finalizado
	Add-Type -AssemblyName PresentationCore,PresentationFramework
	$ButtonType = [System.Windows.MessageBoxButton]::Ok
	$MessageIcon = [System.Windows.MessageBoxImage]::Information
	$MessageBody = "Download Finalizado"
	$MessageTitle = "Status"
	[System.Windows.MessageBox]::Show($MessageBody,$MessageTitle,$ButtonType,$MessageIcon)
}else {
   echo Fechando
}