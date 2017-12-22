<body style="background: url('<?= base_url("img/bg.jpg") ?>') no-repeat center center fixed;">

    <!-------------------------------->
    <!-- Header                     -->
    <!-------------------------------->
    <header>
		<div class="container">
			<div class="row">
				<div class="col-lg-4 ">
					<img class="img-responsive center-block" src="img/project_atap1.png" alt="" width="250">
				</div>
                <div class="col-lg-3 col-lg-offset-5">
                <div class="box" id="boxHeader" style="margin-top:15px;">
					<address style="font-size:18px;">
                    	UD. Karya Sirap Samarinda<br>
                        JL.Sederhana no.45, pasteur<br>
                        Kecamatan sukajadi <br>
                        Bandung, Jawa Barat 40161<br>
                        <abbr title="Phone">Phone:</abbr> 08156030358
                	</address>
                </div>
                	<a class="margin" href="https://www.facebook.com/KaryaSirapSamarinda/?ref=aymt_homepage_panel" ><img src="img/facebook.png" alt="" width="35" height="35" align="right" class="img-rounde mHeader"></a>
                    <a class="margin" href="https://business.google.com/b/101969616960557007082/dashboard/l/18310538842423230553?hl=en "><img src="img/googleplus.png" alt="" width="35" height="35" align="right" class="img-rounded mHeader" ></a>
                    <a class="margin" href="https://www.instagram.com/karyasirapsamarinda/"><img src="img/instagram.png" alt="" width="35" height="35" align="right" class="img-rounded mHeader" ></a>
                    <a class="margin" href="https://twitter.com/KaryaSirap"><img src="img/twitter.png" alt="" width="35" height="35" align="right" class="img-rounded mHeader"></a>

                </div>
		  </div>
		</div>


    <!-- Menu Bar                   -->
    <nav class="navbar navbar-inverse" role="navigation">
		<div class="container">
            <!-- Sricpt Responsive di mobile -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">Sirap Samarinda </a>
            </div>
            <!-- Pilihan di MenuBar         -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active">
                        <a href="index.html">Halaman Utama</a>
                    </li>
                    <li>
                        <a href="tentang_kami.html">Tentang Kami</a>
                    </li>

                    <li>
                    	<a href="produk.html">Produk Sirap</a>
                    </li>

                    <li>
                        <a href="galeri.html">Galeri</a>
                    </li>
                    <li>
                        <a href="kontak.html">Kontak</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  	</header>
    <!-------------------------------->
    <!-- //Header                     -->
    <!-------------------------------->



    <!-------------------------------->
    <!-- Isi                        -->
    <!-------------------------------->
    <div class="container">
      <?php $this->load->view($data["view"],$data) ?>
    </div>
