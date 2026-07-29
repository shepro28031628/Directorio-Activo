# ==============================================================
# ren-lock.ps1 - REN MDM Lock Screen v2.0
# Pantalla de bloqueo corporativa - RENOVA Consultores
# Se ejecuta mediante el agente cuando recibe comando BLOQUEAR
# ==============================================================
Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

# Bloquear entrada del teclado/ratón a nivel de sistema
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WinAPI {
    [DllImport("user32.dll")] public static extern bool BlockInput(bool fBlockIt);
    [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);
    [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
}
"@

[xml]$xaml = @"
<Window
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    WindowStyle="None"
    WindowState="Maximized"
    ResizeMode="NoResize"
    Topmost="True"
    ShowInTaskbar="False"
    Title="REN-MDM-LOCK"
    AllowsTransparency="False"
    Focusable="True">
    <Window.Background>
        <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
            <GradientStop Color="#05050f" Offset="0"/>
            <GradientStop Color="#100822" Offset="0.5"/>
            <GradientStop Color="#0a0514" Offset="1"/>
        </LinearGradientBrush>
    </Window.Background>
    <Grid>
        <!-- Patron de fondo decorativo -->
        <Canvas Opacity="0.05">
            <Ellipse Width="600" Height="600" Canvas.Left="-200" Canvas.Top="-200">
                <Ellipse.Fill><SolidColorBrush Color="#7C3AED"/></Ellipse.Fill>
            </Ellipse>
            <Ellipse Width="400" Height="400" Canvas.Right="-100" Canvas.Bottom="-100">
                <Ellipse.Fill><SolidColorBrush Color="#2563EB"/></Ellipse.Fill>
            </Ellipse>
        </Canvas>

        <!-- Contenido principal -->
        <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center" Width="720">

            <!-- Icono de candado -->
            <Border Width="110" Height="110" CornerRadius="55" HorizontalAlignment="Center" Margin="0,0,0,20">
                <Border.Background>
                    <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                        <GradientStop Color="#4c1d95" Offset="0"/>
                        <GradientStop Color="#1d4ed8" Offset="1"/>
                    </LinearGradientBrush>
                </Border.Background>
                <TextBlock Text="&#128274;" FontSize="52" TextAlignment="Center" VerticalAlignment="Center"/>
            </Border>

            <!-- Titulo -->
            <TextBlock Text="EQUIPO BLOQUEADO" FontSize="46" FontWeight="Bold"
                       Foreground="White" TextAlignment="Center" Margin="0,0,0,8"
                       FontFamily="Segoe UI"/>

            <!-- Subtitulo empresa -->
            <TextBlock Text="RENOVA Consultores · Departamento de Tecnologia" FontSize="16"
                       TextAlignment="Center" Margin="0,0,0,24" FontFamily="Segoe UI">
                <TextBlock.Foreground>
                    <LinearGradientBrush>
                        <GradientStop Color="#7C3AED" Offset="0"/>
                        <GradientStop Color="#2563EB" Offset="1"/>
                    </LinearGradientBrush>
                </TextBlock.Foreground>
            </TextBlock>

            <!-- Separador -->
            <Rectangle Height="2" Margin="100,0,100,28" RadiusX="1" RadiusY="1">
                <Rectangle.Fill>
                    <LinearGradientBrush>
                        <GradientStop Color="#7C3AED" Offset="0"/>
                        <GradientStop Color="#2563EB" Offset="1"/>
                    </LinearGradientBrush>
                </Rectangle.Fill>
            </Rectangle>

            <!-- Mensaje -->
            <TextBlock TextAlignment="Center" Margin="0,0,0,30" FontFamily="Segoe UI">
                <Run Text="Este equipo ha sido bloqueado de forma remota." FontSize="17" Foreground="#c0c0d8"/>
                <LineBreak/>
                <Run Text="El acceso ha sido suspendido hasta nueva autorizacion de TI." FontSize="17" Foreground="#9090b0"/>
            </TextBlock>

            <!-- Panel de contacto -->
            <Border CornerRadius="14" Margin="40,0,40,30" Padding="28,18">
                <Border.Background>
                    <SolidColorBrush Color="#0d0d20" Opacity="0.85"/>
                </Border.Background>
                <Border.BorderBrush>
                    <LinearGradientBrush>
                        <GradientStop Color="#7C3AED" Offset="0"/>
                        <GradientStop Color="#2563EB" Offset="1"/>
                    </LinearGradientBrush>
                </Border.BorderBrush>
                <Border.BorderThickness>1</Border.BorderThickness>
                <StackPanel>
                    <TextBlock Text="PARA SOPORTE CONTACTAR A TECNOLOGIA" FontSize="11" FontWeight="Bold"
                               Foreground="#7C3AED" TextAlignment="Center" Margin="0,0,0,10"
                               FontFamily="Segoe UI" CharacterSpacing="150"/>
                    <StackPanel Orientation="Horizontal" HorizontalAlignment="Center">
                        <TextBlock Text="&#128172; Teams: Soporte TI" FontSize="15" FontWeight="SemiBold"
                                   Foreground="White" Margin="0,0,30,0" FontFamily="Segoe UI"/>
                        <TextBlock Text="&#128222; Ext. 100" FontSize="15" FontWeight="SemiBold"
                                   Foreground="White" FontFamily="Segoe UI"/>
                    </StackPanel>
                </StackPanel>
            </Border>

            <!-- Reloj -->
            <TextBlock Name="ClockText" FontSize="52" FontWeight="Light"
                       TextAlignment="Center" Margin="0,0,0,6" FontFamily="Segoe UI Light">
                <TextBlock.Foreground>
                    <LinearGradientBrush>
                        <GradientStop Color="#8B5CF6" Offset="0"/>
                        <GradientStop Color="#3B82F6" Offset="1"/>
                    </LinearGradientBrush>
                </TextBlock.Foreground>
            </TextBlock>
            <TextBlock Name="DateText" FontSize="15" Foreground="#404068"
                       TextAlignment="Center" FontFamily="Segoe UI"/>

        </StackPanel>

        <!-- Badge esquina inferior -->
        <Border VerticalAlignment="Bottom" HorizontalAlignment="Center" Margin="0,0,0,24"
                Padding="14,6" CornerRadius="20">
            <Border.Background><SolidColorBrush Color="#0d0d20"/></Border.Background>
            <TextBlock FontSize="12" Foreground="#303050" FontFamily="Segoe UI">
                <Run Text="REN MDM Agent v2.0 · "/>
                <Run Name="HostText" Text=""/>
            </TextBlock>
        </Border>

    </Grid>
</Window>
"@

$reader = New-Object System.Xml.XmlNodeReader $xaml
$window = [Windows.Markup.XamlReader]::Load($reader)

$clockText = $window.FindName('ClockText')
$dateText  = $window.FindName('DateText')
$hostText  = $window.FindName('HostText')

$hostText.Text = $env:COMPUTERNAME

# Bloquear TODOS los atajos de teclado
$window.Add_KeyDown({
    param($sender, $e)
    $e.Handled = $true
})
$window.Add_PreviewKeyDown({
    param($sender, $e)
    $e.Handled = $true
})

# Impedir cierre de la ventana
$window.Add_Closing({
    param($sender, $e)
    $e.Cancel = $true
})

# Forzar foco cuando pierde foco
$window.Add_Deactivated({
    $window.Activate()
    $window.Focus()
})

# Temporizador del reloj (cada segundo)
$timer = New-Object System.Windows.Threading.DispatcherTimer
$timer.Interval = [TimeSpan]::FromSeconds(1)
$timer.Add_Tick({
    $now = Get-Date
    $clockText.Text = $now.ToString("HH:mm:ss")
    $dateText.Text  = $now.ToString("dddd, dd 'de' MMMM 'de' yyyy")
})
$timer.Start()

# Reloj inicial
$now = Get-Date
$clockText.Text = $now.ToString("HH:mm:ss")
$dateText.Text  = $now.ToString("dddd, dd 'de' MMMM 'de' yyyy")

# Mostrar ventana (bloqueante)
$window.ShowDialog() | Out-Null
